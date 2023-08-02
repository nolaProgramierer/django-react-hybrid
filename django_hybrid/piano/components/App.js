import React from "react";


// List of people using map with another component
const List = (props) => {
    return (
      <ul>
       {props.persons.map((item) => (
        <Item key={item.id} item={item} />
       ))}
      </ul>
    )
  }
  
  
  const Item = (props) => (
    <li>
      <span><a href={props.item.ip_address}>{props.item.ip_address}</a></span>
      <span>{props.item.first_last}</span>
      <span>{props.item.last_last}</span>
      <span>{props.item.email}</span>
    </li>
  )


function App() {
    
    const persons1 = [{"id":1,"first_name":"Sybille","last_name":"Teager","email":"steager0@cpanel.net","gender":"Female","ip_address":"237.175.8.222"},
{"id":2,"first_name":"Erwin","last_name":"Jeromson","email":"ejeromson1@yellowbook.com","gender":"Male","ip_address":"43.214.86.86"},
{"id":3,"first_name":"Aloysius","last_name":"Alflatt","email":"aalflatt2@cornell.edu","gender":"Male","ip_address":"192.176.30.240"},
{"id":4,"first_name":"Dorry","last_name":"Hawler","email":"dhawler3@topsy.com","gender":"Female","ip_address":"205.90.147.160"},
{"id":5,"first_name":"Lucio","last_name":"Kummerlowe","email":"lkummerlowe4@ning.com","gender":"Genderfluid","ip_address":"213.209.127.123"},
{"id":6,"first_name":"Amabel","last_name":"Ingerman","email":"aingerman5@state.tx.us","gender":"Female","ip_address":"47.15.20.228"},
{"id":7,"first_name":"Yvette","last_name":"Philpots","email":"yphilpots6@liveinternet.ru","gender":"Genderfluid","ip_address":"1.223.234.125"},
{"id":8,"first_name":"Cooper","last_name":"Wickie","email":"cwickie7@unicef.org","gender":"Male","ip_address":"123.140.68.26"},
{"id":9,"first_name":"Talbot","last_name":"Locock","email":"tlocock8@freewebs.com","gender":"Male","ip_address":"41.48.92.169"},
{"id":10,"first_name":"Alain","last_name":"Worrell","email":"aworrell9@census.gov","gender":"Male","ip_address":"9.254.121.32"}]
    
return (
        <div>
           <p>This is an import App component</p>
           <List persons={persons1} />
        </div>
    )
}

export default App;