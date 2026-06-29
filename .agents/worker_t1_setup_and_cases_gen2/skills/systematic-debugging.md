# systematic-debugging Skill Copy
Source: C:\Users\shaban\.gemini\config\skills\systematic-debugging\SKILL.md

Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes.

## The Iron Law
```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

## The Four Phases
1. **Root Cause Investigation**: Read error messages, reproduce consistently, check recent changes, gather evidence, trace data flow.
2. **Pattern Analysis**: Find working examples, compare against references, identify differences.
3. **Hypothesis and Testing**: Form a single hypothesis, test minimally, verify before continuing.
4. **Implementation**: Create a failing test case, implement a single fix, verify the fix. If 3+ fixes fail, question the architecture.
