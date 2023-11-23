import React, { useState } from 'react';

const Items = ({ id, name, description, status, deleteItem, editItem, isEditing, saveEdit, cancelEdit }) => {
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedStatus, setEditedStatus] = useState(status);

  function handleDelete() {
    deleteItem(id);
  }

  function handleSaveEdit() {
    saveEdit(id, editedName, editedDescription, editedStatus);
  }

  function handleCancelEdit() {
    cancelEdit();
  }

  return (
    <div className="item">
      {isEditing ? (
        <div>
            <div style={{display:'flex',justifyContent:'space-evenly',marginBottom:'10px'}}>
                <label for={`status-${id}`} ><strong>Status : </strong></label>
                <select
                    id={`status-${id}`}
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    style={{ marginLeft: '10px',backgroundColor : editedStatus === 'Completed' ? 'green' : 'red',width:'190px'}}
                >
                    <option value="Not Completed" style={{backgroundColor:'red'}}>Not Completed</option>
                    <option value="Completed" style={{backgroundColor:'green'}}>Completed</option>
                </select>
            </div>

            <div style={{display:'flex',justifyContent:'space-around'}}>
                <p><strong>Title :</strong></p>
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    style={{height:'30px'}}
                />
            </div>

            <div style={{display:'flex',justifyContent:'space-around'}}>
                <p><strong>Description:</strong></p>
                <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                />
            </div>

            <div style={{display:'flex',justifyContent:'space-evenly',marginTop:'20px'}}>
                <button onClick={handleSaveEdit} type="button" class="btn btn-info">Save</button>
                <button onClick={handleCancelEdit} type="button" class="btn btn-dark">Cancel</button>
            </div>

        </div>
      ) : (
        <>
          <p><strong>Name: </strong>{name}</p>
          <p><strong>Description: </strong>{description}</p>
          <p><strong>Status: </strong>{status}</p>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button type="button" class="btn btn-success" onClick={editItem}>Edit</button>
            <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Items;
