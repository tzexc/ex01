# Readme - excercise

# Installtion / quick start

1.  first please install `ffmpeg` on your machine ( please read below)
2.  Add you mongo url to config/default.json (default: mongodb://localhost:27017/rtsp)
3.  `npm install && npm run client-install`
4.  `npm run dev`

// Server runs on http://localhost:4000 and client on http://localhost:3000

## backend
- server - express.js
- websockets - socket.ip

### controllers
- auth  ->  handle jwt token process and validate user is authenticated
- user  ->  handle user registration and user data
- rtsps  ->  handle rtsps data and start the socket connection

### Database collection
- users - handle users registration  for example:

    ```sh
        {
            "_id" : ObjectId("5e35c0b3401fe1352b3159fe"),
            "rtsp_urls" : [
                ObjectId("5e35c0bb401fe1352b3159ff"),
                ObjectId("5e35c0cb401fe1352b315a02"),
                ObjectId("5e35d2e880b2cf3d6cf6ad50"),
                ObjectId("5e35d2ee80b2cf3d6cf6ad52"),
                ObjectId("5e35e8decffbd48d323813b4")
            ],
            "name" : "email",
            "email" : "email@gmail.com",
            "password" : "$2b$10$E1pr9IUxkAJYtoUShIzGlOgWC48wac3NXfvNd82vM0QAIgyCL8fdq",
            "createdAt" : ISODate("2020-02-01T20:17:23.161+02:00"),
            "updatedAt" : ISODate("2020-02-01T23:08:46.093+02:00")
        }
    ```
    - passwords are protected with salt ( using bcrypt)

- rtsp ( handle rtsps url with reference to user id)

    ```sh
    {
        "_id" : ObjectId("5e35e8decffbd48d323813b4"),
        "url" : "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
        "user" : ObjectId("5e35c0b3401fe1352b3159fe"),
        "createdAt" : ISODate("2020-02-01T23:08:46.076+02:00"),
        "updatedAt" : ISODate("2020-02-01T23:08:46.076+02:00")
    }```

# AUTH

 - auth using jwt token.

# Configuration 

you can add config to config/default.json


# RTSP

I have implemented rtsp streaming using rtsp with ffmpeg , the data is beign pass to the clien via web socekts into img src or canvas

### FFMPEG
you have to install ffmepg packege to support rtsp video stream 
You can install ffmpeg via three methods:

Downloading a static build from `ffmpeg.org`. Choose these if you want a simple-to-run program that comes with many features. You have to manually update it, though. Also, for licensing reasons, static builds cannot bundle all third-party dependencies.

### mac: 

Installing from Homebrew via `brew install ffmpeg`. You get the most common dependencies (encoders etc.) installed along and it auto-updates when you update Homebrew.

### ubuntu:

`https://linuxize.com/post/how-to-install-ffmpeg-on-ubuntu-18-04/`


# TODOS

- add tests on client+server
- divide Rtsp page to small component . i.e: rtsp item , rtsp table ..etc
- integrate socket.io into redux 
- consider adding typescript to the server or  framework such as nestjs, loopback.. etc
- dockerize 
