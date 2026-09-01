function HumanReviewDetail({ review }) {
  if (!review) return null
  return (
    <section className="detail-section"><h3>Human Review</h3><dl className="config-list"><div><dt>Requested By</dt><dd>{review.requestedBy}</dd></div><div><dt>Reason</dt><dd>{review.reason}</dd></div><div><dt>Reviewer</dt><dd>{review.reviewer}</dd></div><div><dt>Status</dt><dd>{review.status}</dd></div><div><dt>Time Waiting</dt><dd>{review.waiting}</dd></div><div><dt>Decision</dt><dd>{review.decision}</dd></div></dl></section>
  )
}

export default HumanReviewDetail
