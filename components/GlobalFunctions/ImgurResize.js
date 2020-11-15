//90 x 90
export const makeSmallImage = (imgurUrl) => {
    //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 's' + imgurUrl.substr(27)
}

//160 x 160
export const makeMediumSmallImage = (imgurUrl) => {
    console.log(`Making medium: ${imgurUrl}`)
    //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 't' + imgurUrl.substr(27)
}

//320 x 320
export const makeMediumImage = (imgurUrl) => {
    console.log(`Making medium: ${imgurUrl}`)
    //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 'm' + imgurUrl.substr(27)
}

//640 x 640
export const makeLargeImage = (imgurUrl) => {
    console.log(`Making medium: ${imgurUrl}`)
    //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 'l' + imgurUrl.substr(27)
}

//1024 x 1024
export const makeHugeImage = (imgurUrl) => {
    console.log(`Making medium: ${imgurUrl}`)
    //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 'h' + imgurUrl.substr(27)
}