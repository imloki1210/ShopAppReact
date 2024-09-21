import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from 'react-hot-toast'
import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully");
        window.location.href = "/profile";
      }
    });
  }
  return (
    <div>
      {/* <p className="continu/e-p">--Or continue with--</p> */}
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../google.png")} width={"70%"} />
      </div>
    </div>
  );
}
export default SignInwithGoogle;