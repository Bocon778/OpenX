# OpenX
ShareX Upload Server 

# Features

- Image/Video/Gif And Many More File Uploading
- Password Protected Admin Dashboard
  - [Demo](https://demo-openx.wizq.me)
- Frontend Upload Page [Example](https://demo-openx.wizq.me/i/07kZNXFt.png)


# Using Vps/Dedi
<details open>
  <summary>Installation</summary>
  
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

</details>


# Using DBH [Free Hosting]
<details open>
<summary>Installation Using DBH</summary>

Frist Join The Discord Server [DBH / Dan Bot Hosting](https://discord.gg/dbh)<br />
If Your New User Please Do <br />
`DBH!user new`<br />
After Creating Your Account, Link Your Account To Panel By<br />
`DBH!user link`<br />
After Linking You Can Create Sever For OpenX By,<br />
`DBH!server create OpenX OpenX` <br />
If Your A Donator In DBH Use<br />
`DBH!server create-donator OpenX OpenX`<br />

Then That's It Login In To Your Panel You Will See A Server With Name [OpenX]<br />
Go To Startup Bar And Configure Your Server Port Will Already Be Configured You Can Configure Rest Of Them In Startup Tab Of The Panel<br />

[Dan Made A Custom Egg For DBH Users To Able To Use OpenX] 
</details>

# Demo 

Link: https://demo-openx.wizq.me/<br />
Username: Admin<br />
Password: Admin

<h2>Few Images</h2>
![image](https://github.com/Wizqdev/OpenX/assets/87972700/db562b06-a324-4f72-b4f2-a874bec1f3df)<br />
![image](https://github.com/Wizqdev/OpenX/assets/87972700/2fb4de3a-80d5-4b7f-a162-276c58842be2)<br />
![image](https://github.com/Wizqdev/OpenX/assets/87972700/67723c4d-0748-495a-b911-a30ea4bff9bf)<br />
![image](https://github.com/Wizqdev/OpenX/assets/87972700/8c16fa18-2606-4544-854e-e3c77859d765)<br />


<h2>Hosted At DBH</h2>


# Todo
[ ] Url Shortnetr
[ ] Paste Bin
[ ] Multi-User
[ ] Multi-Database Support
[ ] Discord Bot Integration
[ ] 2FA System
[ ] Api

# Credits
Thanks To [@flaxeneel2](https://github.com/flaxeneel2/) For Fixing Backend Issues I Made.<br />
Thanks To [@WilliamDavidHarrison](https://github.com/WilliamDavidHarrison) For Providing The Project Name<br />
Thanks To [@Caliwyr](https://github.com/Caliwyr) For Providing Ideas To Implement In This Project
