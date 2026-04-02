import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiErrorHandler.js";
import {User} from "../models/user.models.js";
import {uploadToCloudinary} from "../utils/cloudinary.js";
import ApiResponseHandler from "../utils/ApiResponseHandler.js";


const registerUser = asyncHandler(async (req,res) => {
    const {fullName,email,username,password} = req.body;

    if(
        [fullName,email,username,password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or : [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409, "Username or email already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadToCloudinary(avatarLocalPath);
    const coverImage = await uploadToCloudinary(coverImageLocalPath);
    
    if(!avatar){
        throw new ApiError(400, "Failed to upload avatar image");
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
        );

        if(!createdUser){
            throw new ApiError(500, "Failed to create user");
        }

        return res.status(201).json(
            new ApiResponseHandler(200, createdUser, "User registered successfully"),
        );

})

export { registerUser };