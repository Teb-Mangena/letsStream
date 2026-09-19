import { useParams } from "react-router";

function CallPage() {
  const { id } = useParams();

  return (
    <div>CallPage - {id}</div>
  )
}

export default CallPage