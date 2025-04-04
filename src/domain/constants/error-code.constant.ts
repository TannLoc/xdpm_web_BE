export enum ErrorCode {
    // Validation Messages
    V000 = 'valid fail',
    V001 = 'name is required',
    V002 = 'name must be a string',
    V003 = 'email is required',
    V004 = 'email must be a string',
    V005 = 'code is required',
    V006 = 'code must be a string',
    V008 = 'imageId must be a number',
    V013 = 'password is required',
    V014 = 'password must be at least 6 characters long',
    V015 = 'password must be no more than 30 characters long',
    V017 = 'password must be a string',
    V018 = 'fullName is required',
    V019 = 'fullName must be a string',
    V020 = 'phoneNumber is required',
    V021 = 'phoneNumber must be a string',
    V022 = 'Invalid phoneNumber',
    V026 = 'isActive is required',
    V027 = 'featureIds must be a array number',
    V029 = 'movementId must be a number',
    V030 = 'marketSegmentId must be a number',
    V031 = 'price is required',
    V032 = 'price must be a number',
    V033 = 'salesPrice is required',
    V034 = 'salesPrice must be a number',
    V035 = 'Price cannot be less than 0',
    V036 = 'salesPrice cannot be less than 0',
    V039 = 'Each item in featureIds must be a number',
    V041 = 'sizeId must be a number',
    V043 = 'quantity cannot be less than 0',
    V044 = 'quantity must be a number',
    V045 = 'quantity is required',
    V046 = 'productId must be a number',
    V047 = 'productId is required',
    V049 = 'importDate is required',
    V050 = 'brandId must be a number',
    V051 = 'imageIds must be a array number',
    V052 = 'Each item in imageIds must be a number',
    V053 = 'otp is required',
    V054 = 'otp must be a string',

    V057 = 'productId is required',
    V058 = 'productId must be a number',
    V059 = 'quantity cannot be less than 1',

    V060="identifier is required",
    V061="identifier must be a string",

    // Authentication Error Messages
    AUTH001 = "Invalid access token",
    AUTH002 = "Invalid identifier or password",
    AUTH003 = "Invalid refresh token",
    AUTH004 = "Login failed",
    AUTH005 = "Permission Denied",
    AUTH006 = "Role is required",
    AUTH007 = "Email already exists",
    AUTH008 = "Phone number already exists",
    AUTH009 = "Register failed",
    AUTH010 = "User does not exist",
    // Brand Error Messages
    BRAND001 = "Image does not exist",
    BRAND002 = "Failed to create brand",
    BRAND003 = "Brand does not exist",
    BRAND004 = "Cannot delete brand",
    BRAND005 = "Failed to update brand",

    // Cart Error Messages
    CART001 = 'User does not exist' ,
    CART002 = "Product does not exist",
    CART003 = "Failed to update cart",
    CART004 = "Failed to add product to cart",
    CART005 = "Cart does not exist",
    CART006 = "Failed to delete cart",

    // Order Error Messages
    ORDER001 = "Failed to create order",
    ORDER002 = "Order does not exist",
    ORDER003 = "Cannot update action order",
    ORDER004 = "Failed to update order",
    ORDER005 = 'User does not exist',
    ORDER007 = "Inventory does not exist",
    ORDER008 = "Product out of stock",
    ORDER009 = "Cannot update order",

    //Picklist
    PL001 = 'Failed to create order',

    // Product Error Messages
    PROD001 = "Product does not exist",
    PROD002 = "Code already exists",
    PROD005 = "Failed to create product",
    PROD006 = "Failed to update product",
    PROD007 = "Gender does not exist",
    PROD008 = "Market Segment does not exist",
    PROD009 = "Movement does not exist",
    PROD011 = "Size does not exist",
    PROD012 = "Image does not exist",
    PROD013 = "Brand does not exist",


    // Shipment Error Messages
    SHIPMENT001 = "Failed to create shipment",
    SHIPMENT002 = "Inventory does not exist",
    SHIPMENT003 = "Failed to update inventory",
    SHIPMENT004 = "Failed to update shipment",
    SHIPMENT005 = "Shipment does not exist",
    SHIPMENT006 = "Cannot delete shipment",
    SHIPMENT007 = "Failed to delete shipment",
    SHIPMENT008 = "Cannot update shipment",

    // Upload Error Messages
    UPLOAD001 = "Upload failed",
    UPLOAD002 = "file is required",
    // Cloudinary Error Messages
    CLOUDINARY002 = "Failed to create cloudinary",

    // User Error Messages
    USER001 = "User does not exist",
    USER002 = "Failed to update user",
}
