export default function Card() {
  return (
    <div>
      <div className="flex-col space-y-rowGap group">
        <h2 className="font-bold text-h2 group-hover:text-primary">
          Target sales suffer after Pride month backlash
        </h2>
        <p className="flex text-caption space-x-colGap">
          <span>10 hours ago</span>
          <span>&middot;</span>
          <span>3 mins read</span>
        </p>
        <p>
          US retail giant Target saw sales fall in-store and online for the
          first time in years after a backlash over its Pride Month offering.
          Sales dropped 5% in the April to June period compared with the same
          time last year - its first fall in six years.
        </p>
      </div>
      <div className="flex justify-end text-xs text-textSecondary space-x-colGap">
        <a>hide</a>
        <span>&middot;</span>
        <a>edit</a>
      </div>
    </div>
  );
}
