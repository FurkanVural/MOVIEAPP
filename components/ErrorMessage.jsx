export default function ErrorMessage({ message }) {
  return (
    <div className="alert alert-danger m-2" role="alert">
      {message}
    </div>
  );
}
