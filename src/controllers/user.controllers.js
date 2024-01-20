import AsyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = AsyncHandler(async (req, res) => {
  //get user deatails from fronted
  //validation - not empty
  //check user already exists: username , email
  //check for image ,check for avatar
  //upload them to cloudinary - avatar
  //create the user object - create user entry in db
  //remove password and refresh token field from the response
  //check for user creation
  //return response

  const { fullName, email, userName, password } = req.body;

  if (!fullName || !email || !userName || !password) {
    throw new ApiError(400, "All fiels are required !!!");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "username or email are  already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar files  required!!!");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Upload failed on cloudinary !!!");
  }

  // if (!coverImage) {
  //   throw new ApiError(400, "failed on cloudinary !!!");
  // }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    userName: userName.toLowerCase(),
    password,
  });

  // if(!user)
  // {
  //   throw new ApiError(400,"")
  // }

  //Another way to check user is created or not
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering the user !!!"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "User registered successfully !!!")
    );
});

export { registerUser };
