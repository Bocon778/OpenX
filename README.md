# OpenX
ShareX Upload Server 

# Features

- Image/Video/Gif And Many More File Uploading
- Password Protected Admin Dashboard
  - [Demo](https://demo-openx.wizq.me)
- Frontend Upload Page [Example](https://demo-openx.wizq.me/i/07kZNXFt.png)


<Installtion open>
  
# Installation (Ubuntu, Debian)

```bash
git clone https://github.com/Wizqdev/OpenX/
cd OpenX
npm i
```

# Configuration
```json
{
    "Web": {
        "Port": "3000", // Port Of The Server
        "Domain": "https://demo-openx.wizq.me", // Domain
        "Secret": "QfBWV8{hX-#;{B#Yi.}Zx1wNMN4jQ53.^3{/F=3sEq(hh)7rwT" // Random Hash Can Also Be Genrated From[wizq.me](https://wizq.me/tools/password-generator)
    },
    "Key": "123456789", // ShareX Password For Private Uploading
    "fileNameLength": 8, // File Name Lenght
    "maxUploadSize": 1024, // Max Upload Sizq
    "allowedFileTypes": {
        "image": [".png", ".jpg", ".gif", ".webp", ".ico", ".raw"],
        "video": [".mp4", ".gifv"],
        "audio": [".mp3"],
        "html": [".html"]
    }, // Allowed File Types
    "Admin": {
        "Username": "Admin", // Dashboard Username
        "Password": "Admin"  // Dashboard Password
    }
}
```
# Running The Server 
Onces you've properly configured your server you can run `node .`
You can keep your server runing forever if you use a process manager, like pm2. pm2 install along with server
`npm i -g pm2` To Install Pm2
`pm2 start Src/index.js` To Start The OpenX Forever
`pm2 monit` To View Logs 

</Installtion>








# Credits
Thanks To [@flaxeneel2](https://github.com/flaxeneel2/) For Helping In Backend 
