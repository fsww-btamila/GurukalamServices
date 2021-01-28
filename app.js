const express = require("express");
const bodyParser = require("body-parser");
const { request } = require("express");
const app = express();


const pdf = require('html-pdf');
const moment = require('moment');
const fs = require('fs');

const url = require('url');

 
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.set('ManiRoute', ""); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.header("Access-Control-Allow-Headers", "x-requested-with, Content-Type, origin, authorization, accept, client-security-token");
  next();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to HTML-IMAGE-PDF." });
});


app.post("/htmltoimage", (request, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      let reqParam = request.body;
      console.log("Welcome.....");
      console.log("reqParam",reqParam);

      const htmlData = reqParam.htmlData;
      const fileName = reqParam.fname;
      const type = reqParam.type;

      var resultObj = {};
      var options = { format: 'A4', "type": "jpeg" }; 

      pdf.create(htmlData, options).toBuffer(function(err, buffer){

      const base64Image = new Buffer.from(buffer).toString('base64');
      // console.log(base64Image)
      // const dataURI = 'data:application/pdf;base64,' + base64Image;
      // const dataURI = 'data:image/png;base64,' + base64Image;

      var utc = (moment.utc()).valueOf();
      var path = 'tmp/image/';
      var fname = 'fileName' +'_'+utc+'.jpeg';
      var fileLocation = path + fname;

      fs.writeFile(fileLocation, base64Image, 'base64', function(err) {
            if (err) { console.log(err) } else {
            console.log("Image Uploaded successfully..")

            }
      });

      resultObj = {
            'Msg':'Image created successfully...',
            'image':base64Image
      }
      
      });

      return res.json(resultObj);
};

app.post("/imageConvert", (request, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      let reqParam = request.body;
      console.log("Welcome.....");
      console.log("reqParam",reqParam);

      // const htmlData = reqParam.htmlData;
      const fileName = reqParam.fname;
      const type = reqParam.type;

      var resultObj = {};

      if(type === 1){

          // const img = await nodeHtmlToImage({
          //   output: './image.png',
          //   html: htmlData
          // });

          var htmlData='<html>\
            <head>\
                <title></title>\
            </head>\
            <body>\
           <section class="main--content">\
            <div class="m_content-section clearfix p-15 vd_bg-white">\
            <div align="center"><h3>Rancangan Pembelajaran Harian (RPH)</h3></div>\
            <hr>\
            <div id="rph" class="p-l-30 p-r-30">\
            <div class="p-l-30">\
            <table width="100%" border="0" cellspacing="10" cellpadding="10">\
            <tbody><tr>\
            <td width="35%" align="left" valign="top" class="fz-15px"><p><b> பள்ளி சின்னம் </b><br><img src="http://gurukalam.my/assets/school/images/aa12d6abfa2b37fa5e4383583c5b5b24-orig.jpg" width="70"></p></td>\
            <td width="30%" align="left" valign="top" class="fz-15px"><p><b> பள்ளி பெயர் </b><br>SJKT Jalan Tajul</p></td>\
            <td width="40%" align="left" valign="top" class="fz-15px"><p><b> ஆசிரியர் பெயர் </b><br>Murugan Arumugam</p></td>\
            </tr>\
            </tbody></table>\
            <div class="divider-2"></div>\
            <table width="100%" border="0" cellspacing="10" cellpadding="10">\
            <tbody><tr>\
            <td width="25%" align="left" valign="top" class="fz-15px"><p><b> திகதி </b><br>12-01-2021</p></td>\
            <td width="25%" align="left" valign="top" class="fz-15px">\
            <p><b> கிழமை </b><br>\
            செவ்வாய்\
            </p>\
            </td>\
            <td width="25%" align="left" valign="top" class="fz-15px"><p><b> வாரம் </b><br>02</p></td>\
            <td width="25%" align="left" valign="top" class="fz-15px"><p><b> நேரம் </b><br>10:30 AM - 11:00 AM</p></td>\
            </tr>\
            </tbody></table>\
            <div class="divider-2"></div>\
            <table width="100%" border="0" cellspacing="10" cellpadding="10">\
            <tbody><tr>\
            <td width="25%" align="left" valign="top" class="fz-15px">\
            <p><b> வகுப்பு </b><br>\
            ஆண்டு 1\
            </p>\
            </td>\
            <td width="25%" align="left" valign="top" class="fz-15px">\
            <p><b> பாடம் </b><br>\
            தமிழ்\
            </p>\
            </td>\
            <td width="25%" align="left" valign="top" class="fz-15px">\
            <p><b> பிரிவு </b><br>Malligai</p>\
            </td>\
            </tr>\
            </tbody></table>\
            <div class="divider-2"></div>\
            <table width="100%" border="0" cellpadding="0" cellspacing="0" class="rph-view m-t-15">\
            <tbody><tr>\
            <td width="25%" align="left" valign="top"><b> தொகுதி / கருப்பொருள் </b></td>\
            <td align="left" valign="top">தொகுதி 1</td>\
            </tr>\
            <tr>\
            <td width="25%" align="left" valign="top"><b> தலைப்பு </b></td>\
            <td align="left" valign="top">வடிவங்கள்</td>\
            </tr>\
            <tr>\
            <td width="25%" align="left" valign="top"><b> உள்ளடக்கத்தரம் </b></td>\
            <td align="left" valign="top">1.8. கதை கூறுவர்</td>\
            </tr>\
            <tr>\
            <td width="25%" align="left" valign="top"><b> கற்றல்தரம் </b></td>\
            <td align="left" valign="top">\
            <div>1.8.1  தனிப்படத்தைத் துணையாகக் கொண்டு கதை கூறுவர்</div>        <div>1.8.1  தனிப்படத்தைத் துணையாகக் கொண்டு கதை கூறுவர்</div>            </td>\
            </tr>\
            <tr>\
            <td width="25%" align="left" valign="top"><b> பாட நோக்கம் </b></td>\
            <td align="left" valign="top">\
            </td>\
            </tr>\
            <tr>\
            <td width="25%" align="left" valign="top"><b> வெற்றிக்கூறு </b></td>\
            <td align="left" valign="top">\
                  </td>\
            </tr>\
            <tr>\
            <td width="25%" align="left" valign="top"><b> கற்றல் கற்பித்தல் நடவடிக்கை </b></td>\
            <td align="left" valign="top">                                                                                                                                                                </td>\
            </tr>\
            </tbody></table>\
            <table width="100%" border="0" cellpadding="0" cellspacing="0" class="rph-view">\
            <tbody><tr>\
            <td width="25%" align="left" valign="top"><b> 21 -ஆம் நூற்றாண்டு கல்வி </b></td>\
            <td width="25%" align="left" valign="top">\
            <div>நிபுணர் இருக்கை</div>                                              </td>\
            <td width="25%" align="left" valign="top"><b> உயர்நிலைச் சிந்தனைத் திறன் நடவடிக்கைகள் </b></td>\
            <td width="25%" align="left" valign="top">\
            </td>\
            </tr>\
            </tbody></table>\
            <table width="100%" border="0" cellpadding="0" cellspacing="0" class="rph-view">\
            <tbody><tr>\
            <td width="25%" align="left" valign="top"><b> விரவிவரும் கூறுகள் </b></td>\
            <td width="15%" align="left" valign="top">\
            <div>நன்னெறிப் பண்பு</div>                                              </td>\
            <td width="15%" align="left" valign="top" class="wsnr"><b> சிந்தனை வரைபடம் </b></td>\
            <td width="15%" align="left" valign="top">\
            <div>குமிழி வரைபடம்</div>                                              </td>\
            <td width="15%" align="left" valign="top"><b> பண்புக்கூறு </b></td>\
            <td width="15%" align="left" valign="top">\
            <div>அன்புடைமை</div>                                              </td>\
            </tr>\
            </tbody></table>\
            <table width="100%" border="0" cellpadding="0" cellspacing="0" class="rph-view">\
            <tbody><tr>\
            <td width="25%" align="left" valign="top"><b> பாடத்துணைப் பொருள் </b></td>\
            <td width="15%" align="left" valign="top">\
            </td>\
            <td width="15%" align="left" valign="top"><b> மதிப்பீடு முறை </b></td>\
            <td width="15%" align="left" valign="top">\
            <div>பயிற்சி</div>                                              </td>\
            <td width="15%" align="left" valign="top" class="wsnr"><b> வகுப்பறை மதிப்பீடு </b></td>\
            <td width="15%" align="left" valign="top">\
            <div>நடத்தப்பட்டது</div>                                              </td>\
            </tr>\
            </tbody></table>\
            <table width="100%" border="0" cellpadding="0" cellspacing="0" class="rph-view">\
            <tbody><tr>\
            <td width="25%" align="left" valign="top"><b> Submitted Date &amp; Time </b></td>\
            <td width="25%" align="left" valign="top"> 11-01-2021 07:49 PM </td>\ Date and Time </b></td>\
            <td width="25%" align="left" valign="top"> 11-01-2021 07:50 PM </td>\
            </tr>\
            </tbody></table>\
            </div>\
            </div>\
            </div>\
            </section>\
            </body>\
            </html>'; 
          // var html = fs.readFileSync(htmlData, 'utf8');
            var options = { format: 'A4', "type": "png" }; 
             
            pdf.create(htmlData, options).toBuffer(function(err, buffer){

            const base64Image = new Buffer.from(buffer).toString('base64');
            // console.log(base64Image)
            // const dataURI = 'data:application/pdf;base64,' + base64Image;
            const dataURI = 'data:image/png;base64,' + base64Image;

            var utc = (moment.utc()).valueOf();
            var path = 'tmp/image/';
            var fname = 'fileName' +'_'+utc+'.png';
            var fileLocation = path + fname;

            fs.writeFile(fileLocation, base64Image, 'base64', function(err) {
            if (err) { console.log(err) } else {
            console.log("Image Uploaded successfully..")

            }});

            resultObj = {
            'Msg':'Image created successfully...',
            'image':base64Image
            }
          });

      return res.json(resultObj);
      }else{
        // res.setHeader('Access-Control-Allow-Origin', '*');
        console.log("htmltopdf");
        
      return res.json(resultObj);

      }


});
 
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
