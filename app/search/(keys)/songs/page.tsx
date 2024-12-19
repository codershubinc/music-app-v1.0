/* eslint-disable */
'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ViewResult from '../../searchUtils/result.frame'
import { log } from 'console'

function Page() {
    const [tpQre, setTpQre] = useState<any>()
    const navigate = useRouter()

    const search = async (q: string) => {
        try {
            const fetchData = await fetch(`https://saavn.dev/api/search/songs?query=${q?.trim().replaceAll(' ', '+')}`)
            const data = await fetchData.json()
            if (data?.data) {
                setTpQre(data);
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
                <div
                className='bg-black border border-solid border-slate-500 w-[98vw] mx-auto p-2 rounded-2xl flex flex-col justify-center items-center  '
                >
                    Top Query Result
                    {(
                        tpQre.data.results.map((sng: any) => 
                            <div
                            className='border border-solid border-slate-700 bg-slate-900 w-[40%] m-2 rounded-2xl p-2 '
                            >
                                <h2
                                className='text-2xl'
                                >
                                    {sng?.name || 'song name'}
                                </h2>
                                <a
                                    href={sng['downloadUrl'].find((d: any) => d.quality === '320kbps')?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    downloadUrl
                                </a>
                                <img
                                    src={sng['image'].find((l: any) => l.quality === '50x50')?.url}
                                    alt=""
                                />
                            </div>
                        )
                    )}

                </div>
            )}
        </>
    )
}

export default Page