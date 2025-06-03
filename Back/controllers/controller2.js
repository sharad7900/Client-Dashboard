const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.API_KEY });
const jwt = require("jsonwebtoken");

const Corporate_PortFolio = async (req, res) => {
  const cookie = req.cookies.token;
  if (!cookie) {
    return res.status(400).json({ message: "Session Expired" });
  }

  try {
    const data = jwt.verify(cookie, process.env.SECRET);
    const page_id = data.Page_ID;
    const CORPORATE_PORTFOLIO_ID = process.env.CORPORATE_PORTFOLIO_ID;
    const PAN = data.PAN;
    const response2 = await notion.databases.query({
      database_id: CORPORATE_PORTFOLIO_ID
      , filter: {
        property: "PAN Number",
        rollup: {
          any: {
            rich_text: {
              equals: PAN
            }
          }
        }
      }
    });
    const items = [];
    for (var i = 0; i < response2.results.length; i++) {
      items.push({ "id": response2.results[i].id });
      items[i]["Task Name"] = response2.results[i].properties['Task name'].title[0].text.content || " ";
      items[i]["Status"] = response2.results[i].properties.Status.status.name || " ";
      items[i]["Due"] = response2.results[i].properties['Due Date'].date ? response2.results[i].properties['Due Date'].date.start : " ";
      items[i]["Frequency"] = response2.results[i].properties.Frequency.number || " ";
      items[i]["Days_Left"] = response2.results[i].properties['Remaining Days'].formula.string || " ";
    }
    res.status(200).json(items);

  }

  catch (error) {
    res.status(401).json({ message: "Session Expired" });
  }


}

const Demat_PortFolio = async (req, res) => {
  const cookie = req.cookies.token;
  if (!cookie) {
    return res.status(400).json({ message: "Session Expired" });
  }

  try {
    const data = jwt.verify(cookie, process.env.SECRET);
    const page_id = data.Page_ID;
    const DEMAT_PORTFOLIO_ID = process.env.DEMAT_PORTFOLIO_ID;
    const PAN = data.PAN;
    const response2 = await notion.databases.query({
      database_id: DEMAT_PORTFOLIO_ID
      , filter: {
        property: "PAN Number",
        rollup: {
          any: {
            rich_text: {
              equals: PAN
            }
          }
        }
      }
    });
    const items = [];

    for (var i = 0; i < response2.results.length; i++) {
      items.push({ "id": response2.results[i].id });
      items[i]["Task Name"] = response2.results[i].properties['Task name'].title[0].text.content || " ";
      items[i]["Status"] = response2.results[i].properties.Status.status.name || " ";
      items[i]["Due"] = response2.results[i].properties['Due Date'].date ? response2.results[i].properties['Due Date'].date.start : " ";
      items[i]["Frequency"] = response2.results[i].properties['Frequency (Months)'].number || " ";
      items[i]["Days_Left"] = response2.results[i].properties['Remaining Days'].formula.string || " ";
    }
    res.status(200).json(items);

  }

  catch (error) {
    res.status(401).json({ message: "Session Expired" });
  }

}

const Create_Task = async (req, res) => {
  const cookie = req.cookies.token;
  if (!cookie) {
    return res.status(400).json({ message: "Session Expired" });
  }
  try {
    const data = jwt.verify(cookie, process.env.SECRET);
    const page_id = data.Page_ID;
    const { Task_Name, Due_Date, Priority, Frequency, db_id } = req.body;
    const configMap = {
      MFD: {
        task_name: "Task_name",
        due: "Due",
        priority: "Priority",
        frequency: "Frequency (Months)",
        db: process.env.MFD_ID,
      },
      CP: {
        task_name: "Task name",
        due: "Due Date",
        priority: "Priority",
        frequency: "Frequency",
        db: process.env.CORPORATE_PORTFOLIO_ID,
      },
      DP: {
        task_name: "Task name",
        due: "Due Date",
        priority: "Priority",
        frequency: "Frequency (Months)",
        db: process.env.DEMAT_PORTFOLIO_ID,
      },
    };
    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        "database_id": configMap[db_id].db
      },
      properties: {
        [configMap[db_id].task_name]: {
          title: [
            {
              text: {
                content: Task_Name
              }
            }
          ]
        },
        [configMap[db_id].due]: {
          date: { start: Due_Date }
        },
        [configMap[db_id].frequency]: {
          number: Number(Frequency)
        },
        [configMap[db_id].priority]: {
          select: { name: Priority || " " },
        },
        Contact: {
          relation: [
            {
              id: page_id,
            },
          ],
        },
      }
    });

    return res.status(201).json({ message: "Task Added Successfull" });

  }
  catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Something went wrong!" })
  }

}


module.exports = { Corporate_PortFolio, Demat_PortFolio, Create_Task };