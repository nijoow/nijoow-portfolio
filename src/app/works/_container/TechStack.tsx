interface Props {
  stacks: readonly string[];
}

function TechStack({ stacks }: Props) {
  return (
    <div className="work-tech-stack flex flex-wrap gap-1.5">
      {stacks.map((stack) => (
        <span
          key={stack}
          className="text-ink-secondary rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium"
        >
          {stack}
        </span>
      ))}
    </div>
  );
}

export default TechStack;
