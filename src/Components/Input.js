import {useState} from 'react';
import Items from './Items';

const Input = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [items,setItems] = useState([]);
    const [status, setStatus] = useState('Not Completed');
    const [selectedItem,setSelectedItem] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    function addItem(){

        if(!name || !description){
            alert("Enter the required details")
        }
        const item = {
            id : Math.floor(Math.random() * 1000),
            value1 : name,
            value2 : description,
            status : 'Not Completed'
        }
        setItems((oldList) => [...oldList,item]);
        setName('');
        setDescription('');
        setStatus('Not Completed');
    }

    function deleteItem(id) {
        const newArray = items.filter((item) => item.id !== id);
        setItems(newArray);
        setSelectedItem(null);
      }
    
    function editItem(id) {
        const selectedItem = items.find((item) => item.id === id);
        setSelectedItem(selectedItem);
        setName(selectedItem.value1);
        setDescription(selectedItem.value2);
        setStatus(selectedItem.status);
      }
    
    function saveEdit(id, editedName, editedDescription, editedStatus) {
        const updatedItems = items.map((item) =>
          item.id === id
            ? { ...item, value1: editedName, value2: editedDescription, status: editedStatus }
            : item
        );
        setItems(updatedItems);
        setSelectedItem(null);
        setName('');
        setDescription('');
        setStatus('Not Completed');
      }
    
    function cancelEdit() {
        setSelectedItem(null);
        setName('');
        setDescription('');
        setStatus('Not Completed');
      }
    function handleFilterChange(event) {
        setSelectedFilter(event.target.value);
    }
    
    return(
        <>  
            <h3 style={{textAlign:'center',marginTop:'20px',marginBottom:'20px'}}>My Todo</h3>
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap',justifyContent:'center'}}>

                <input type="text" class="form-control" placeholder="ToDo Name" aria-label="Username" aria-describedby="basic-addon1" style=    {{width:'500px'}} value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                ></input>

                <input type="text" class="form-control" placeholder="ToDo Description" aria-label="Username" aria-describedby="basic-addon1" style= {{width:'500px'}} value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}
                ></input>

                <button type="button" class="btn btn-primary"
                    onClick={()=>{
                        addItem();
                    }}
                >Add Todo</button>

            </div>

            <div style={{display:'flex',justifyContent:'space-between',margin:'20px',marginLeft:'120px',marginRight:'180px'}}>
                <h4>My Todos:</h4>
                
                <div>
                <label for="filter" style={{marginRight:'5px'}}><h4>Filter : </h4></label>                
                <select id="filter" value={selectedFilter} onChange={handleFilterChange} style={{ marginLeft: '10px',backgroundColor : selectedFilter === 'Completed' ? 'green' : 'red'}}>
                    <option value="All" style={{ backgroundColor: 'blue'}}>All</option>
                    <option value="Completed" style={{ backgroundColor: 'green',padding: '5px' }}>Completed</option>
                    <option value="Not Completed" style={{ backgroundColor: 'red',padding: '5px' }}>Not Completed</option>
                </select>
                </div>
            </div>

            <div style={{display:'flex',justifyContent:'center',gap:'10px',marginTop:'20px',flexWrap:'wrap'}}>
            {       
                items.filter((item) => {
                  if (selectedFilter === 'Completed') {
                    return item.status === "Completed";
                  } else if (selectedFilter === 'Not Completed') {
                    return item.status === "Not Completed";
                  }
                  return true; // 'all' option
                })
                .map((item) => (
                  <Items
                    key={item.id}
                    id={item.id}
                    name={item.value1}
                    description={item.value2}
                    status={item.status}
                    deleteItem={deleteItem}
                    editItem={() => editItem(item.id)}
                    saveEdit={saveEdit}
                    cancelEdit={cancelEdit}
                    isEditing={selectedItem && selectedItem.id === item.id}
                  />
                ))
            }
            
            </div>
            
        </>
    );
}

export default Input;