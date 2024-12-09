import React, { useState } from 'react';
import { musicFromLink } from '@/utils/funcs/getMusicLink';

interface QueryResult {
    id: string;
    title: string;
    description: string;
    image: { quality: string; url: string }[];
    type: string;
    url: string;
}

interface ViewResultProps {
    title: string;
    queryRes: { results: QueryResult[] };
    targetLinkTitle: string;
    imageClass: string;
    containerClass: string;
}

function ViewResult({ title, queryRes, targetLinkTitle , imageClass, containerClass }: ViewResultProps) {
    const [prefetchedLinks, setPrefetchedLinks] = useState<Record<string, string>>({});

    const prefetchMusicLink = async (url: string) => {
        if (!prefetchedLinks[url]) {
            const data = await musicFromLink(url);
            const link = data.data[0]?.downloadUrl.find((d: any) => d.quality === '320kbps')?.url;
            setPrefetchedLinks((prev) => ({ ...prev, [url]: link }));
        }
    };

    return (
        <div className={"border border-solid border-red-500 m-3" + " " + containerClass}>
            <h2>{title}</h2>
            {queryRes.results.map((result) => {
                const imageUrl = result.image?.find((img) => img.quality === '500x500')?.url || 'default-image.png';
                const linkUrl =
                    result.type === 'song'
                        ? prefetchedLinks[result.url] || '#'
                        : result.url;

                return (
                    <div key={result.id}>
                        <h3>{result.title}</h3>
                        <img
                            src={imageUrl}
                            alt={result.title}
                            className={"w-10 h-10 border-2 border-black" + " " + imageClass}
                        />
                        <p>{result.description}</p>
                        <a
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => result.type === 'song' && prefetchMusicLink(result.url)}
                        >
                            {targetLinkTitle}
                        </a>
                    </div>
                );
            })}
        </div>
    );
}

export default ViewResult;
