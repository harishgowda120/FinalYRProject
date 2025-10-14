export default function NotFound() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="h4 mb-3">Oops! You're a bit off track...</p>
      <p className="text-muted mb-4">
        We scanned your emotions... and even they are confused! <br />
        Seems like this page doesn't exist or has been moved.
      </p>

      <img 
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" 
        alt="Confused AI Robot"
        className="img-fluid mb-4"
        style={{ maxWidth: '300px', borderRadius: '15px' }}
      />

      <a href="/" className="btn btn-primary px-4 py-2">
        Take Me Home
      </a>
    </div>
  );
}
