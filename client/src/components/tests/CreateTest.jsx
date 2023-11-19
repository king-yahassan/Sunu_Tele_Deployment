import { useState } from "react";
import Instance from "../Instance";


function CreateTest() {
  const [test, setTest] = useState({
    date: new Date(),
    value: ""})

  const { value } = test;
  const onInputChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        setTest({ ...test, date: Date.now() });
      Instance.post("http://localhost:5000/api/newTest", test);
      // console.log(subscriber);
      window.location = "/home";
    } catch (error) {
      console.error("-+-+-+-Erreur lors de la connexion:", error);
    }
  };


  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  value
                </label>
                <input
                  value={value}
                  name="value"
                  type="text"
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required={true}
                />
              </div>

              
              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">
                  Add Test
                </button>
              </div>
            </form>
    </div>
  );
}

export default CreateTest;
