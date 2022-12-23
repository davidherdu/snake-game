const SelectLevel = ({setLevel}) => {

  const renderLevels = () => {
    let content = []
    const initSpeed = 1000
    for (let i = 0; i < 10; i++) {
        content.push(<div key={i} className="level" onClick={() => setLevel(initSpeed - i * 100)}>{i + 1}</div>)
    }

    return content
  }

  return (
    <div className="select-level">
      <h2>Select level</h2>
      <div className="levels">
        {renderLevels()}
      </div>
    </div>
  )
}

export default SelectLevel
