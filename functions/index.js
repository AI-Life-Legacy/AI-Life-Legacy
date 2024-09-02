import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// 사용자 정의 모듈 불러오기 
import { initApp,auth } from './config/firebase.config.js'
import { chatGptRouter } from './src/route/chatgpt.route.js';
import { writeRouter } from './src/route/write.route.js';
import { myprofileRouter } from './src/route/myprofile.route.js';
import { userRouter } from './src/route/user.route.js';

const app = express();

app.use(cors({ 
    origin: ['https://lifelegacy.co.kr','https://www.lifelegacy.co.kr'], 
    credentials: true 
}));

app.use(cookieParser());
app.use(express.json()); // JSON 요청을 처리할 수 있도록 설정
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청을 처리할 수 있도록 설정

app.use(async function(req, res, next) {
  // authorization 헤더가 있는 경우 Firebase Auth Token 검증, 해당 하는 UID 를 저장한다.
  if (req.headers.authorization) {
      await auth
          .verifyIdToken(req.headers.authorization.split(" ")[1])
          .then((decodedToken) => {
              const uid = decodedToken.uid;
              res.locals.uid = uid;
          }).catch((error) => {
              return res.status(400).json({error: error});
          });
  }
  next();
});

app.use("/user",userRouter);
app.use("/myprofile",myprofileRouter);
app.use("/write", writeRouter);
app.use("/chatGpt", chatGptRouter);

export const api = functions.region("asia-northeast3").https.onRequest(app);
