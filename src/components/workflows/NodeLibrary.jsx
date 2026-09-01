import { nodeCategories } from '../../data/workflowsData'

function NodeLibrary({ onAddNode }) {
  return (
    <aside className="node-library" aria-label="Node library">
      <div className="panel-title">
        <h2>Node Library</h2>
        <p>Click any block to add it to the canvas.</p>
      </div>
      <div className="node-library-list">
        {nodeCategories.map((category) => (
          <section className="library-category" aria-labelledby={`library-${category.name}`} key={category.name}>
            <h3 id={`library-${category.name}`}>{category.name}</h3>
            <div>
              {category.nodes.map((node) => {
                const Icon = node.icon

                return (
                  <button className="library-node" type="button" onClick={() => onAddNode(node)} key={node.type}>
                    <Icon size={17} aria-hidden="true" />
                    <span>
                      <strong>{node.title}</strong>
                      <small>{node.description}</small>
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </aside>
  )
}

export default NodeLibrary
