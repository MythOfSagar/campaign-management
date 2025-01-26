const { Router } = require("express");
const  auth = require("../middleware/auth.middleware");

const resourceRouter = Router();
const { ResourceModel } = require("../models/resource.model");

resourceRouter.get("/", async (req, res) => {

  const {type}=req.query

  try {
    let allResources
    if(type){
      allResources = await ResourceModel.find({type});
    }else{
      allResources = await ResourceModel.find();
    }
   
    res.status(200).send(allResources);
  } catch (err) {
    res.status(500).send(err);
  }
});



resourceRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleResource = await ResourceModel.findById(id);

    res.status(200).send(singleResource || {});
  } catch (err) {
    res.status(500).send(err);
  }
});


resourceRouter.use(auth)

resourceRouter.post("/", async (req, res) => {
  const newResourceDetails = req.body;

  try {
    const newResource = new ResourceModel({ ...newResourceDetails });
    await newResource.save();
    res.status(200).send(newResource);
  } catch (err) {
    res.send(err);
  }
});


resourceRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ResourceModel.findByIdAndDelete(id);
    res.status(200).send("Succcessfully deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

resourceRouter.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const udatedDetails = req.body;
  try {
    await ResourceModel.findByIdAndUpdate(id, { ...udatedDetails });

    res.status(200).send(udatedDetails);
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = { resourceRouter };
