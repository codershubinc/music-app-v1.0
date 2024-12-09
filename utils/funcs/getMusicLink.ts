const musicFromLink = async (l: string) => {
    const data = await fetch(`https://saavn.dev/api/songs?link=${l}`)
    const fDt = await data.json()
    return fDt
}

export {
    musicFromLink
}