const express = require("express");
const con = require("./Database/Db");
const router = express.Router();

router.post('/user', function (req, res) {
  req = req.body;
  let SelectQuery = "Select Id from Users where Username = '" + req.user + "' and Password = '" + req.pass + "'";
  const branch_id=`select BranchId from branch where BranchName=(select Branch from users where Username='${req.user}')`;
  let data;
  con.promise().query(branch_id).then(function (results) {
    data=results;
  })
  con.promise().query(SelectQuery).then(function (results) {
    res.send({results,data});
  }).catch((error) => console.log(error));
});


router.post('/course', function (req, res) {
  req = req.body;
  let SelectQuery = "Select * from Branch";
  con.promise().query(SelectQuery).then(function (results) {
    console.log("result==>", results);
    res.send(results);
  });
});


router.post('/question', function (req, res) {
  const {eid,branch_id} = req.body;
  console.log(eid);
  let SelectQuery = `Select * from Question where eid ='${eid}' and BranchId=${branch_id} `;
  con.promise().query(SelectQuery).then(function (results) {
    res.send(results);
  });
});

router.post('/signup', function (req, res) {
  req = req.body;
  const SelectQuery = `INSERT INTO Users 
                     SET Username = '${req.user}', 
                         Password = '${req.pass}', 
                         Name = '${req.name}',
                         College = '${req.college}',
                         Email = '${req.email}',
                         Year = '${req.year}',
                         Gender = '${req.gender}',
                         DOB = '${req.dob}',
                         Branch='${req.branch}'`;
  console.log("SelectQuery==>", SelectQuery);
  con.promise().query(SelectQuery).then(function (results) {
    console.log("result==>", results);
    let data = {};
    if (results.affectedRows == 1) {
      data.insert = true;
    }
    else {
      data.insert = false;
    }
    res.send(data);
  });
});

async function correct_ans(q) {
  console.log(q);
  return new Promise(async (resolve, reject) => {
    let SelectQuery = `SELECT correct_ans FROM Answer WHERE Que ='${q}'`;
    console.log("SelectQuery==>", SelectQuery);

    try {
      con.promise().query(SelectQuery).then(function (results) {
        console.log("result==>", results);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}


// router.post('/result', async function (req, res) {
//   const {ans,que} = req.body;
//   const questions = que.map(exam => exam.Que);
//   let results =[];
//   for (let key in ans) {
//     let data = {};
//     let SelectQuery = `SELECT correct_ans FROM Answer WHERE Que ='${questions[key]}'`;
//     con.promise().query(SelectQuery).then(function (results) {
//       data.correct_answer = results[0][0].correct_ans;
//       data.selectedOption = ans[key];
//       console.log(data);
//       results.push(data);
      
//     });
   
//   }
//   console.log(results);
//   res.send(results);
// });

router.post('/result', async function (req, res) {
  const { ans, que } = req.body;
  const questions = que.map(exam => exam.Que);
  let results = [];
  

  try {
    const promises = Object.keys(ans).map(async (key) => {
      let data = {};
      let SelectQuery = `SELECT correct_ans FROM Answer WHERE Que ='${questions[key]}'`;
      
      const [rows] = await con.promise().query(SelectQuery);
      
      data.correct_answer = rows[0].correct_ans;
      data.selectedOption = ans[key];
      console.log(data);
      
      results.push(data);
    });

    await Promise.all(promises);

    console.log(results);
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred");
  }
});



router.get('/getprofile/:user', (req, res) => {
  const { user } = req.params;
  console.log(user);
  const query = `SELECT * FROM Users WHERE Username = '${user}'`;

  con.promise().query(query).then(function (results) {
    console.log("result==>", results);
    res.send(results);
  });
});


router.get('/getexams/:branch_id', (req, res) => {
  const{ branch_id}=req.params;
  const query = `SELECT distinct(eid),
  title,
  \`right\`,
  wrong,
  total,
  time,
  scheduled_date
 FROM exam where branch_id=${branch_id}`;

  con.promise().query(query).then(function (results) {
    res.send(results);
  });
});


router.post('/addexam', (req, res) => {
  const { eid, title, right, wrong, total, time, scheduled_date, branch_id, scheduled_time } = req.body;
  console.log(eid);
  const sql = `INSERT INTO exam set
                    eid='${eid}',
                    title='${title}',
                    \`right\`=${right},
                    wrong=${wrong},
                    total=${total},
                    time=${time},
                    scheduled_date='${scheduled_date}',
                    branch_id=${branch_id},
                    scheduled_time='${scheduled_time}'`;

  const values = [eid, title, right, wrong, total, time, scheduled_date, branch_id, scheduled_time];

  con.promise().query(sql, values).then(function (results) {
    console.log("result==>", results);
    res.send(results);
  })
})
router.post('/addque', (req, res) => {
  console.log("ji");
 console.log(req.body);
  const { questions,eid,branch_id } = req.body;
  console.log(eid,branch_id)
  questions.map((element) => {
    console.log(element)
    const sql = `INSERT INTO question set
                    Que='${element.question}',
                    op1='${element.options[0]}',
                    op2='${element.options[1]}',
                    op3='${element.options[2]}',
                    op4='${element.options[3]}',
                    BranchId=${branch_id},
                    eid='${eid}'`;
    con.promise().query(sql).then(function (results) {
      console.log("result==>", results);
    })
    const answer_query = `INSERT INTO answer set
    Que='${element.question}',
    correct_ans='${element.correctAnswer}'`;
    con.promise().query(answer_query).then(function (results) {
      console.log("result==>", results);
    })
  })
  res.json({message:"added successfully"});
})
module.exports = router;
