# Cart routes ---------------------------------------------------------------------------------

# curl -X POST http://localhost:3000/api/cart/add \
# -H "Content-Type: application/json" \
# -d '{
#   "userId": "6eeb6f1d-2508-4cc6-b64c-8a881363168c",
#   "productId": "15eb4732-3c11-498a-a8fc-befc29ca1f00",
#   "quantity": 5
# }'

# curl -X GET "http://localhost:3000/api/cart/get?userId=78462b33-5481-4508-bbb0-25dfccea0be4" \
# -H "Content-Type: application/json"


# curl -X POST http://localhost:3000/api/cart/item/decrease-quantity \
# -H "Content-Type: application/json" \
# -d '{
#   "userId": "78462b33-5481-4508-bbb0-25dfccea0be4",
#   "productId": "ff282e94-48d4-446d-9ddc-6d5220075333"
# }'

# curl -X DELETE http://localhost:3000/api/cart/remove \
# -H "Content-Type: application/json" \
# -d '{
#   "cartItemId": "d3f1984e-4d4d-427d-bf5c-bda954b6d8fe"
# }'


# Wishlist routes ---------------------------------------------------------------------------------

# curl -X POST http://localhost:3000/api/wishlist/add \
# -H "Content-Type: application/json" \
# -d '{
#   "userId": "6eeb6f1d-2508-4cc6-b64c-8a881363168c",
#   "productId": "15eb4732-3c11-498a-a8fc-befc29ca1f00"
# }'

# curl -X GET "http://localhost:3000/api/wishlist/get?userId=78462b33-5481-4508-bbb0-25dfccea0be4" \
# -H "Content-Type: application/json" \
# -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ODQ2MmIzMy01NDgxLTQ1MDgtYmJiMC0yNWRmY2NlYTBiZTQiLCJlbWFpbCI6ImFkbWluQG1haWwuY28iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzE0NzA1ODYsImV4cCI6MTczMTU1Njk4Nn0.Rlz2NZMwvxNyKoJ7bpC49gKnbQIMOu0EBG_sRZM3i2M"


# curl -X DELETE http://localhost:3000/api/wishlist/remove \
# -H "Content-Type: application/json" \
# -d '{
#   "userId": "78462b33-5481-4508-bbb0-25dfccea0be4",
#   "productId": "ff282e94-48d4-446d-9ddc-6d5220075333"
# }'


# Product Review --------------------------------------------------------------------------------------------------------

# curl -X POST http://localhost:3000/api/product-review/add \
# -H "Content-Type: application/json" \
# -d '{
#   "userId": "6eeb6f1d-2508-4cc6-b64c-8a881363168c",
#   "productId": "15eb4732-3c11-498a-a8fc-befc29ca1f00",
#   "rating": 5,
#   "review": "Good product"
# }'

# curl -X GET "http://localhost:3000/api/product-review/get?productId=ff282e94-48d4-446d-9ddc-6d5220075333" \
# -H "Content-Type: application/json"


# User address ------------------------------------------------------------------------------------------------

# curl -X POST "http://localhost:3000/api/users/address/add" \
# -H "Content-Type: application/json" \
# -d '{
#   "userId": "5c8e5487-1199-4137-a620-75b8ffe838f5",
#   "addressLine1": "Second address",
#   "addressLine2": "Apt 4B",
#   "isDefault": true,
#   "city": "CityName 2",
#   "state": "StateName 2 ",
#   "zipCode": "123456",
#   "country": "CountryName 4",
#   "mobileNumber": "9876543210"
# }'

# curl -X POST "http://localhost:3000/api/vides" \
# -H "Content-Type: application/json" \
# -d '{
#   "title": "Vide title",
#   "description": "Small description",
#   "videoUrl": "https://vide.com",
#   "productId": "15eb4732-3c11-498a-a8fc-befc29ca1f00",
# }'

# curl -X DELETE "http://localhost:3000/api/user/address" \
# -H "Content-Type: application/json" \
# -d '{
#   "addressId": "12345"  # The ID of the address to delete
# }'

# curl -X PATCH "http://localhost:3000/api/users/address/switch-default" \
# -H "Content-Type: application/json" \
# -d '{
#   "userId": "5c8e5487-1199-4137-a620-75b8ffe838f5",
#   "addressId": "96c585e9-d8bb-4776-8dcf-4c57f4784439",
#   "isDefault": true
# }'

# curl -X GET "http://localhost:3000/api/users/address/get?userId=5c8e5487-1199-4137-a620-75b8ffe838f5" \
# -H "Content-Type: application/json"

# curl -X GET "http://localhost:3000/api/users/address/get?userId=5c8e5487-1199-4137-a620-75b8ffe838f5&addressId=96c585e9-d8bb-4776-8dcf-4c57f4784439" \
# -H "Content-Type: application/json"

# curl -u rzp_test_zz3K5BMOqB5J2V:PMnesia91R7HKEGNCI5fPVQH \
# -X GET https://api.razorpay.com/v1/payments/pay_PKmSUnLs5l8VD2/?expand[]=card


# Dashboard Data fetching ----------------------------------------------------------------------------------------------------- 

# curl -X GET "http://localhost:3000/api/dashboard-data/recent-orders" \
# -H "Content-Type: application/json" \
# -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZWViNmYxZC0yNTA4LTRjYzYtYjY0Yy04YTg4MTM2MzE2OGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY28iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzE5MDIzNjEsImV4cCI6MTczMTk4ODc2MX0.ZPioF6yF4Me9n95MYmI0uuD9xcdCTyEzP0IWvH3p-7Y"

# if (!isAdmin(request)) {
#       return NextResponse.json(
#         { message: 'Unauthorised access!' },
#         { status: 401 }
#       )
#     }





# User -------------------------------------------------------------------------------------------------------- 

# curl -X DELETE "http://localhost:3000/api/users/delete" \
# -H "Content-Type: application/json" \
# -d '{"id": "4f478f8e-fe45-41e0-b586-49ff11ca3756"}'


# curl -X POST https://akkoma.dev/user/settings \
#   -H "Content-Type: application/json" \
#   -b "_csrf=D92b2Mfl3kttcWJngmTviVdr4LU6MTczMTkzMDA0NjQ0ODA2ODIxOA" \
#   -d '{
#     "name": "sabakhan064286",
#     "full_name": "",
#     "pronouns": "",
#     "biography": "",
#     "website": "https://www.thefashionsalad.com",
#     "location": "",
#     "visibility": 1
#   }' \
  


# Shop by season ----------------------------------------------------------------------------------------------

# curl -X POST "http://localhost:3000/api/customs/shop-by-season/video/add" \
# -H "Content-Type: application/json" \
# -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZWViNmYxZC0yNTA4LTRjYzYtYjY0Yy04YTg4MTM2MzE2OGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY28iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzIwNzU0MzgsImV4cCI6MTczMjE2MTgzOH0.JNdlia5DfqjMoCUMifQrenHRYSeD2Gh6ES0GeA4RcTM" \
# -d '{
#     "videoUrl": "https://dimpaldas.in"
# }'

# curl -X PATCH "http://localhost:3000/api/customs/shop-by-season/video/update" \
# -H "Content-Type: application/json" \
# -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZWViNmYxZC0yNTA4LTRjYzYtYjY0Yy04YTg4MTM2MzE2OGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY28iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzIwNzU0MzgsImV4cCI6MTczMjE2MTgzOH0.JNdlia5DfqjMoCUMifQrenHRYSeD2Gh6ES0GeA4RcTM" \
# -d '{
#     "id": "01731e96-4d25-428e-a9e7-452b4c214c1c",
#     "videoUrl": "https://dimpaldas.com"
# }'

# curl -X DELETE "http://localhost:3000/api/customs/shop-by-season/video/delete" \
# -H "Content-Type: application/json" \
# -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZWViNmYxZC0yNTA4LTRjYzYtYjY0Yy04YTg4MTM2MzE2OGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY28iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzIwNzU0MzgsImV4cCI6MTczMjE2MTgzOH0.JNdlia5DfqjMoCUMifQrenHRYSeD2Gh6ES0GeA4RcTM" \
# -d '{
#     "id": "01731e96-4d25-428e-a9e7-452b4c214c1c"
# }'

# curl -X GET "http://localhost:3000/api/customs/shop-by-season/video/get" \
# -H "Content-Type: application/json" \
# -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZWViNmYxZC0yNTA4LTRjYzYtYjY0Yy04YTg4MTM2MzE2OGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY28iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzIwNzU0MzgsImV4cCI6MTczMjE2MTgzOH0.JNdlia5DfqjMoCUMifQrenHRYSeD2Gh6ES0GeA4RcTM"


# curl -X POST "http://localhost:3000/api/customs/shop-by-season/add" \
# -H "Content-Type: application/json" \
# -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZWViNmYxZC0yNTA4LTRjYzYtYjY0Yy04YTg4MTM2MzE2OGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY28iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzIwNzU0MzgsImV4cCI6MTczMjE2MTgzOH0.JNdlia5DfqjMoCUMifQrenHRYSeD2Gh6ES0GeA4RcTM" \
# -d '{
#     "seasonId": "01731e96-4d25-428e-a9e7-452b4c214c1c",
#     "imageUrl": "https://image-url.com",
#     "hyperLink": "https://dimpaldas.in.hyperlink",
#     "description": "https://dimpaldas.in.hyperlink"
# }'

# curl -X GET "http://localhost:3000/api/customs/shop-by-season/get" \
# -H "Content-Type: application/json" \
# -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZWViNmYxZC0yNTA4LTRjYzYtYjY0Yy04YTg4MTM2MzE2OGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY28iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzIwNzU0MzgsImV4cCI6MTczMjE2MTgzOH0.JNdlia5DfqjMoCUMifQrenHRYSeD2Gh6ES0GeA4RcTM" \
# -d '{
#     "seasonId": "01731e96-4d25-428e-a9e7-452b4c214c1c",
#     "imageUrl": "https://image-url.com",
#     "hyperLink": "https://dimpaldas.in.hyperlink",
#     "description": "https://dimpaldas.in.hyperlink"
# }'

# curl -X DELETE "http://localhost:3000/api/customs/shop-by-season/delete" \
# -H "Content-Type: application/json" \
# -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZWViNmYxZC0yNTA4LTRjYzYtYjY0Yy04YTg4MTM2MzE2OGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY28iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzIwNzU0MzgsImV4cCI6MTczMjE2MTgzOH0.JNdlia5DfqjMoCUMifQrenHRYSeD2Gh6ES0GeA4RcTM" \
# -d '{
#     "id": "dafb7ef2-bca2-491a-b979-67a702ac5ccc"
# }'


# Search Query ----------------------------------------------------------------------------------------------- 

# curl -X GET "http://localhost:3000/api/search?query=wedding&id=6eeb6f1d-2508-4cc6-b64c-8a881363168c" \
# -H "Content-Type: application/json"



# Vides ---------------------------------------------------------------------------------------------------------- 

# curl -X POST "http://localhost:3000/api/vides" \
# -H "Content-Type: application/json" \
# -d '{
#   "title": "Vide title",
#   "description": "Small description",
#   "videoUrl": "https://vide.com",
#   "productId": "15eb4732-3c11-498a-a8fc-befc29ca1f00",
#   "price": 5000
# }'

# curl -X GET "http://localhost:3000/api/vides" \
# -H "Content-Type: application/json"


curl -X GET "http://localhost:3000/api/search?searchQuery=saree&minPrice=2000&maxPrice=3000"