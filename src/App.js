import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from './components/Sidenavbar';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye } from '@fortawesome/free-solid-svg-icons';

// Example component for pages
const Leads = () => <div>Leads Page</div>;
const Pages = () => <div className='page'><p>Pages Page</p></div>;

function App() {
  const [sampleData, setSampleData] = useState([]);
  const [username, setUsername] = useState('username');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editMode, setEditMode] = useState({ id: null, edit: false, text: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/667fa346e41b4d34e40aa598/");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSampleData(data.record);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchUsername = async () => {
      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/667fa893acd3cb34a85eddc0");
        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }
        const data = await response.json();
        setUsername(data.record[0].username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchData();
    fetchUsername();
  }, []);

  const handleButton = (id) => {
    const updatedData = sampleData.map(row => {
      if (row.id === id) {
        return { ...row, assignedTo: username };
      }
      return row;
    });
    setSampleData(updatedData);
  };

  const toggleEditMode = (id, currentText) => {
    setEditMode({ id: id, edit: !editMode.edit, text: currentText });
  };

  const saveEditedText = (id, newText) => {
    const updatedData = sampleData.map(row => {
      if (row.id === id) {
        return { ...row, remark: newText };
      }
      return row;
    });
    setSampleData(updatedData);
    setEditMode({ id: null, edit: false, text: '' });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Router>
      <div className="WholeArea">
        <SideNav />
        <div className="mainArea">
          <div className="heading">
            <div id="username">
              <FontAwesomeIcon icon={faUser} size="1x" />
              <p>{username}</p>
            </div>
          </div>

          <Routes>
            <Route path="/pages" element={<Pages />} />
            <Route path="/" element={
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>S. N</th>
                      <th>Name</th>
                      <th>State</th>
                      <th>Phone</th>
                      <th>Service</th>
                      <th>Remark</th>
                      <th>Assign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.state}</td>
                        <td>
                          {row.assignedTo ? row.phone : 'XXXXXXXXXX'}
                        </td>
                        <td>{row.service}</td>
                        <td className="fixed-width">
                          {editMode.edit && editMode.id === row.id ? (
                            <div id='textarea'>
                              <textarea
                                value={editMode.text}
                                onChange={(e) => setEditMode({ ...editMode, text: e.target.value })}
                              />
                              <button className='button' onClick={() => saveEditedText(row.id, editMode.text)}>Save</button>
                            </div>
                          ) : (
                            <div id='remarkBox'>
                              {row.remark}
                              <FontAwesomeIcon
                                icon={faEye}
                                className="edit-icon"
                                onClick={() => toggleEditMode(row.id, row.remark)}
                              />
                            </div>
                          )}
                        </td>
                        <td>
                          <button className='Assignbutton' onClick={() => handleButton(row.id)}>
                            {row.assignedTo ? row.assignedTo : 'Assign'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination">
                  <div className='pagebutton'>
                  <button className='button-page' onClick={handlePrevPage} disabled={currentPage === 1} >Prev Page</button>
                  </div>
                  <ul>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'current-page' : ''}
                      >
                        <span>{index + 1}</span>
                      </li>
                    ))}
                  </ul>
                  <div className='pagebutton'>
                  <button className='button-page' onClick={handleNextPage} disabled={currentPage === totalPages}   >Next Page</button>
                  </div>
                </div>
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
