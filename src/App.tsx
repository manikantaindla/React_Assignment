import DataTable, { Column } from './components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Manikanta', email: 'mani@example.com' },
  { id: 2, name: 'Alice', email: 'alice@example.com' },
  { id: 3, name: 'Bob', email: 'bob@example.com' },
];

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
];

function App() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Users Table</h1>
      <DataTable
        data={users}
        columns={columns}
        selectable
        onRowSelect={(rows) => console.log('Selected rows:', rows)}
      />
    </div>
  );
}

export default App;
