// src/components/Board.jsx
// src/components/Board.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import GroupingOptions from './GroupingOptions';
import SortingOptions from './SortingOptions';



const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [users, setUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  


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
      // Grouping by priority
      groupedTickets = tickets.reduce((groups, ticket) => {
        const priority = ticket.priority;
        if (!groups[priority]) {
          groups[priority] = [];
        }
        groups[priority].push(ticket);
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
            <h2>{ticketGroup.group}</h2>
            {ticketGroup.tickets.map(ticket => (
              <Card key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;












