import { useEffect, useState } from "react";
import Employdata from "./Employdata";
import "./App.css";
const App = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setid] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setData(Employdata);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find((item)=>item.id === id);
    if (dt)
    {
      setIsUpdate(true);
      setid(id)
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setAge(dt.age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this record?")) {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
      }
    }
  };
  const handleSave = () => {

  if (!firstName.trim()) {
    alert("First Name is required");
    return;
  }

  if (!lastName.trim()) {
    alert("Last Name is required");
    return;
  }

  if (age === "" || Number(age) <= 0) {
    alert("Please enter a valid age");
    return;
  }

  const newData = [
    ...data,
    {
      id: data.length + 1,
      firstName,
      lastName,
      age: Number(age)
    }
  ];

  setData(newData);
  handleClear();
}; 
  
const handleUpdate = () => {
  if (!firstName.trim()) {
    alert("First Name is required");
    return;
  }

  if (!lastName.trim()) {
    alert("Last Name is required");
    return;
  }

  if (age === "" || Number(age) <= 0) {
    alert("Please enter a valid age");
    return;
  }

  const updatedData = data.map((item) =>
    item.id === id
      ? {
          ...item,
          firstName,
          lastName,
          age: Number(age),
        }
      : item
  );

  setData(updatedData);
  handleClear();
};

  const handleClear = () => {
    setid(0);
      setFirstName('');
      setLastName('');
      setAge('');
      setIsUpdate(false);
  };
  const filteredData = data.filter((item) =>
  `${item.firstName} ${item.lastName}`
    .toLowerCase()
    .includes(search.toLowerCase())
);
  return (
  <div className="dashboard">

    {/* Sidebar */}
    <aside className="sidebar">

      <h2 className="logo">
        EMS<span>.</span>
      </h2>

      <p className="menu-heading">MAIN MENU</p>

      <div className="menu-item active">
        <span>▦</span>
        Dashboard
      </div>

      <div className="menu-item">
        <span>♙</span>
        Employees
      </div>

      <div className="sidebar-bottom">
        Employee Management System
      </div>

    </aside>

    {/* Main Content */}
    <main className="main-content">

      <header className="top-header">

        <div>
          <h2>Dashboard</h2>
          <p>Welcome to Employee Management System</p>
        </div>

        <div className="admin-profile">
          <div className="profile-icon">A</div>
          <span>Admin</span>
        </div>

      </header>

      <section className="stats-container">

        <div className="stat-card">
          <div className="stat-icon">♙</div>

          <div>
            <p>Total Employees</p>
            <h2>{data.length}</h2>
          </div>
        </div>

      </section>
{/* Add Employee Form */}

<section className="content-card">

  <div className="section-heading">
    <div>
      <h3>{isUpdate ? "Update Employee" : "Add New Employee"}</h3>
      <p>Enter employee information below</p>
    </div>
  </div>

  <div className="employee-form">

    <div className="input-group">
      <label>First Name</label>

      <input
        type="text"
        placeholder="Enter first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>

    <div className="input-group">
      <label>Last Name</label>

      <input
        type="text"
        placeholder="Enter last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>

    <div className="input-group">
      <label>Age</label>

      <input
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
    </div>

    <div className="form-buttons">

      {!isUpdate ? (
        <button
          className="btn-primary"
          onClick={handleSave}
        >
          + Add Employee
        </button>
      ) : (
        <button
          className="btn-primary"
          onClick={handleUpdate}
        >
          Update Employee
        </button>
      )}

      <button
        className="btn-secondary"
        onClick={handleClear}
      >
        Clear
      </button>

    </div>

  </div>

</section>
{/* Employee Records */}

<section className="content-card">

  <div className="section-heading table-heading">

    <div>
      <h3>Employee Records</h3>
      <p>Manage your employee information</p>
    </div>

    <input
  className="search-input"
  type="text"
  placeholder="Search employee..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

  </div>

  <div className="table-responsive">

    <table className="employee-table">

      <thead>
        <tr>
          <th>Sr. No</th>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {filteredData.map((item, index) => (


          <tr key={item.id}>

            <td>{index + 1}</td>
            <td>#{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.age}</td>

            <td>

              <button
                className="edit-btn"
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}
        {filteredData.length === 0 && (
  <tr>
    <td colSpan="6" className="empty-message">
      <h3>No Employees Found</h3>
      <p>No employee records available.</p>
    </td>
  </tr>
)}

      </tbody>

    </table>

  </div>

</section>
    </main>

  </div>
);


  
  };

export default App;
