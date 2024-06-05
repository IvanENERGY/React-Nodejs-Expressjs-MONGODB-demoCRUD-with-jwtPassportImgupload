

npm init
npm install nodemon mongoose express http-status-codes cors 
npm start

---------
npx create-react-app . --template typescript

npm start
npm install react-router-dom react-hook-form yup @hookform/resolvers axios 





for this app, data validation only performed in frontend
//for create , we check these in frontend

  const schema = yup.object().shape({
        name: yup.string().required("Task name must be entered"),
        deadline:yup.date().min(new Date()).required(),
        reps:yup.number().positive().integer().min(0).max(20).required()
    })
//for update, we do valid check using vanilla js 
