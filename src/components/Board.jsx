// src/components/Board.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faTasks, faPlayCircle, faClock } from '@fortawesome/free-solid-svg-icons';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import GroupingOptions from './GroupingOptions';
import SortingOptions from './SortingOptions';

const avatarIconPath = `${process.env.PUBLIC_URL}/man.png`;
const urgentIconPath = `${process.env.PUBLIC_URL}/urgent.png`;
const highIconPath = `${process.env.PUBLIC_URL}/signal.png`;
const mediumIconPath = `${process.env.PUBLIC_URL}/medium.png`;
const lowIconPath = `${process.env.PUBLIC_URL}/strength.png`;
const noIconPath = `${process.env.PUBLIC_URL}/no.png`;

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [users, setUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const getStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return <FontAwesomeIcon icon={faTasks} className="status-icon todo" />;
      case 'In progress':
        return <FontAwesomeIcon icon={faPlayCircle} className="status-icon in-progress" />;
      case 'Backlog':
        return <FontAwesomeIcon icon={faClock} className="status-icon backlog" />;
      default:
        return null;
    }
  };
  
  const getPriorityIcon = (priority) => {
    console.log("Received priority:", priority); 
    switch (priority) {
      case 'Urgent':
        return <img
        src={urgentIconPath}
        alt="urgent"
        style={{ marginLeft: "10px", width: "25px", height: "25px" }}
      />;
      case 'High':
        return <img
        src={highIconPath}
        alt="high"
        style={{ marginLeft: "10px", width: "25px", height: "25px" }}
      />;
      case 'Medium':
        return <img
        src={mediumIconPath}
        alt="medium"
        style={{ marginLeft: "10px", width: "35px", height: "35px" }}
      />;
      case 'Low':
        return <img
        src={lowIconPath}
        alt="low"
        style={{ marginLeft: "10px", width: "30px", height: "30px" }}
      />;
      case 'No Priority':
        return <img
        src={noIconPath}
        alt="no"
        style={{ marginLeft: "10px", width: "30px", height: "30px" }}
      />;
      default:
        return null;
    }
  };

  
  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        console.log('API Response:', response.data);
        setTickets(response.data.tickets); // Extracting the 'tickets' array
        setUsers(response.data.users); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };
  const groupAndSortTickets = (tickets, groupingOption, sortingOption, users) => {
    // Grouping and sorting logic
    let groupedTickets = {};

    if (groupingOption === 'status') {
      groupedTickets = tickets.reduce((groups, ticket) => {
        const status = ticket.status;
        if (!groups[status]) {
          groups[status] = [];
        }
        groups[status].push(ticket);
        return groups;
      }, {});
    }
    else if (groupingOption === 'user') {
      // Grouping by user
      groupedTickets = tickets.reduce((groups, ticket) => {
        const user = users.find(user => user.id === ticket.userId);
        const userName = user ? user.name : 'Unassigned';
        
        if (!groups[userName]) {
          groups[userName] = [];
        }
        groups[userName].push(ticket);
        return groups;
      }, {});
    }
    else if (groupingOption === 'priority') {
      // Grouping by custom priority labels
      groupedTickets = tickets.reduce((groups, ticket) => {
        let priorityLabel;
  
        switch (ticket.priority) {
          case 4:
            priorityLabel = 'Urgent';
            break;
          case 3:
            priorityLabel = 'High';
            break;
          case 2:
            priorityLabel = 'Medium';
            break;
          case 1:
            priorityLabel = 'Low';
            break;
          default:
            priorityLabel = 'No Priority';
        }
  
        if (!groups[priorityLabel]) {
          groups[priorityLabel] = [];
        }
        groups[priorityLabel].push(ticket);
        return groups;
      }, {});
    }

    for (const group in groupedTickets) {
      if (sortingOption === 'priority') {
        groupedTickets[group].sort((a, b) => b.priority - a.priority);
      } else if (sortingOption === 'title') {
        groupedTickets[group].sort((a, b) => a.title.localeCompare(b.title));
      }
    }

    return Object.entries(groupedTickets).map(([group, tickets]) => ({ group, tickets }));
  };

  const groupedAndSortedTickets = groupAndSortTickets(tickets, groupingOption, sortingOption, users);

  return (
    <div>
      <nav>
        {/* Navigation bar content */}
      </nav>
      <div className="board">
        <button className="options-button" onClick={toggleDropdown}>Display</button>
        {isDropdownOpen && (
          <div className="options-dropdown">
            <GroupingOptions onChange={setGroupingOption} />
            <SortingOptions onChange={setSortingOption} />
          </div>
        )}
        {groupedAndSortedTickets.map(ticketGroup => (
          <div key={ticketGroup.group}>
            <h2 style={{ display: "flex", alignItems: "center" }}>
              {groupingOption === 'status' && getStatusIcon(ticketGroup.group)}
              {ticketGroup.group}
  
              {groupingOption === 'user' ? (
                <img
                  src={avatarIconPath}
                  alt="Avatar"
                  style={{ marginLeft: "10px", width: "25px", height: "25px" }}
                />
              ) : null}
  
              {groupingOption === 'priority' && (
              <span className="priority-icon">
                {getPriorityIcon(ticketGroup.group)}
              </span>
            )}
            </h2>
            {ticketGroup.tickets.map(ticket => (
              <Card key={ticket.id} ticket={ticket} groupingOption={groupingOption}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
  
  
}

export default Board;












