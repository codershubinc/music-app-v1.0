/* eslint-disable */
'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ViewResult from './searchUtils/result.frame'

function Page() {
    const [tpQre, setTpQre] = useState<any>()
    const navigate = useRouter()

    const search = async (q: string) => {
        try {
            const fetchData = await fetch(`https://saavn.dev/api/search?query=${q?.replaceAll(' ', '+')}`)
            const data = await fetchData.json()
            console.log('data', data);

            if (data?.data) {
                setTpQre(data?.data);
            } else {
                setTpQre(null);
                console.log('No data found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setTpQre(null);
        }
    }
    

    return (
        <>
            <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    search(e.target.value)
                }}
                className='text-black ml-4 h-11'
            />

            {tpQre && (
                <div>
                    {/* Top Query Result */}
                    {tpQre.topQuery?.results?.length > 0 && (
                        <ViewResult
                            queryRes={tpQre.topQuery}
                            title="Top Query Result"
                            targetLinkTitle="Listen"
                            containerClass=''
                            imageClass=''
                        />  
                    )}

                    {/* Songs */}
                    {tpQre.songs?.results?.length > 0 && (
                        <ViewResult
                            queryRes={tpQre.songs}
                            title="Songs"
                            targetLinkTitle="Download"
                            containerClass=''
                            imageClass=''
                        />
                    )}

                    {/* Albums */}
                    {tpQre.albums?.results?.length > 0 && (
                        <ViewResult
                            queryRes={tpQre.albums}
                            title="Albums"
                            targetLinkTitle="Listen"
                            containerClass=''
                            imageClass=''
                        />
                    )}

                    {/* Artists */}
                    {tpQre.artists?.results?.length > 0 && (
                        <ViewResult 
                            queryRes={tpQre.artists}
                            title="Artists"
                            targetLinkTitle="Listen"
                            containerClass=''
                            imageClass=''
                        />
                    )}

                    {/* Playlists */}
                    {tpQre.playlists?.results?.length > 0 && (
                        <ViewResult
                            queryRes={tpQre.playlists}
                            title="Playlists"
                            targetLinkTitle="Listen"
                            containerClass=''
                            imageClass=''
                        />  
                    )}
                </div>
            )}
        </>
    )
}

export default Page