const { ObjectId } = require('mongodb');
const { JWT_SIGN } = require('../config/index');
const { verify } = require('jsonwebtoken');
const jwt = require("jsonwebtoken")


async function createList(req, res) {
    const { list, property, status, dueDate } = req.body;
    const validProperties = ['high', 'medium', 'low'];
    const validStatuses = ['to do', 'on progress', 'done'];
    const authHeader = req.headers.authorization;

    if (!validProperties.includes(property)) {
        return res.status(400).json({
            message: 'Invalid property value. Allowed values are high, medium, and low.',
            success: false,
        });
    }

    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            message: 'Invalid status value. Allowed values are to do, on progress, and done.',
            success: false,
        });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SIGN);
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        const newList = await req.listsCollection.insertOne({
            username: decoded.username,
            list,
            property,
            status,
            dueDate, 
            date: formattedDate,
        });

        res.status(201).json({
            message: 'Successfully added List to do',
            data: newList,
            success: true,
        });
    } catch (error) {
        console.error(error);

        res.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
            success: false,
        });
    }
}


async function getAllList(req, res) {
    const authHeader = req.headers.authorization;

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SIGN);

        let query = {};
        if (decoded.role === 'admin') {
            query = {};
        } else {
            query = { username: decoded.username };
        }
        const userLists = await req.listsCollection.find(query).toArray();

        res.status(200).json({
            message: 'Successfully retrieved user lists',
            data: userLists,
            success: true,
        });
    } catch (error) {
        console.error(error);

        res.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
            success: false,
        });
    }
}


async function updateList(req, res) {
    const { property, status } = req.body;
    const validProperties = ['high', 'medium', 'low'];
    const validStatuses = ['to do', 'on progress', 'done'];
    const authHeader = req.headers.authorization;
    const id = req.params.id; 

    if (property && !validProperties.includes(property)) {
        return res.status(400).json({
            message: 'Invalid property value. Allowed values are high, medium, and low.',
            success: false,
        });
    }

    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({
            message: 'Invalid status value. Allowed values are to do, doing, and done.',
            success: false,
        });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SIGN);
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString(); 

        const filter = { _id: new ObjectId(id), username: decoded.username };
        const updateFields = {};
        
        if (property) {
            updateFields.property = property;
        }

        if (status) {
            updateFields.status = status;
        }

        const options = { returnDocument: 'after' };
        const updatedList = await req.listsCollection.findOneAndUpdate(
            filter,
            { $set: { ...updateFields, date: formattedDate } },
            options
        );

        if (!updatedList) {
            return res.status(404).json({
                message: 'List not found or you do not have permission to update it.',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Successfully updated list',
            data: updatedList.value,
            success: true,
        });
    } catch (error) {
        console.error(error);

        res.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
            success: false,
        });
    }
}


async function deleteList(req, res) {
    const { id } = req.params;
  
    try {
      const result = await req.listsCollection.deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 1) {
        res.status(200).json({
          message: "Successfully deleted",
        });
      } else {
        res.status(404).json({
          message: "List not found",
        });
      }
    } catch (error) {
      console.error('Error deleting list:', error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  




    module.exports = {
        createList,
        getAllList,
        updateList,
        deleteList
    }