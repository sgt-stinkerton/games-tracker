export default function CommonPageHeader ({ title, sideInfo="" }) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-baseline mt-1">  {/* do not touch the mt-1 */}
        <div className="d-flex flex-row align-items-baseline gap-3">
          <h4 className="mb-1">{title}</h4>
          <p className="m-0 text-muted">{sideInfo}</p>
        </div>
      </div>
      <hr className="my-2"></hr>
    </>
  )
}