

npm init <br>
npm install nodemon mongoose express http-status-codes cors <br>
npm start<br>
<hr>
---------
npx create-react-app . --template typescript<br>
<br>
npm start<br>
npm install react-router-dom react-hook-form yup @hookform/resolvers axios <br>
<br>
<br>
<br>


for this app, data validation only performed in frontend<br>
//for create , we check these in frontend<br>
<br>
<pre>
  const schema = yup.object().shape({
        name: yup.string().required("Task name must be entered"),
        deadline:yup.date().min(new Date()).required(),
        reps:yup.number().positive().integer().min(0).max(20).required()
    })
</pre>
//for update, we do valid check using vanilla js 
