export default async function Users() {
  const response = await fetch("http://localhost:3000/api/v1/admin/users");
  const data = await response.json();

  return (
    <div>
      <h1> These are your users: </h1>
      <ul>
        {data.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
