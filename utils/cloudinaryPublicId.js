const cloudinaryPublicId =(url)=>{
    console.log(url)
    const publicId = url.split("/").pop().split(".")[0];
    return publicId.trim()
}

module.exports = cloudinaryPublicId