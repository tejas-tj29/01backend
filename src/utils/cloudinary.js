import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}) 


const uploadToCloudinary = async(localFilePAth) => {
    try{
        if(!localFilePAth)
            return null;
        //Uploading image to cloudinary
        const response = await cloudinary.uploader.upload(localFilePAth,{
            resource_type: "auto",
        });
        //Uploading is successful
        console.log("File has been uploaded successfully:", response.url);
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePAth);
        console.error("Error uploading file to Cloudinary:", error);
        return null;
    }
}

export {uploadToCloudinary};