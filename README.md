# Think MCP Server

<div align="center">
  <img src="./images/logo.png" alt="Think MCP Logo" width="200">
  
  An MCP (Model Context Protocol) server that provides a thinking tool for AI assistants to organize their reasoning during complex tasks. Built with TypeScript and deployable on Cloudflare Workers.
</div>

## Features

- 🧠 **Thinking Tool**: Helps AI assistants explicitly reason through complex problems
- 🚀 **Cloudflare Workers**: Runs serverless with global distribution
- 🎯 **Focused Purpose**: Single tool dedicated to improving AI reasoning
- 🌐 **Dual Transport**: Supports both SSE and Streamable HTTP for maximum compatibility
- 📦 **Simple Architecture**: Stateless design with minimal overhead
- 🔍 **Transparent Reasoning**: Makes AI decision-making more observable

## Architecture

This server implements the MCP specification using Cloudflare's Agents SDK:
- **GET /sse**: SSE endpoint for MCP communication
- **POST /mcp**: Streamable HTTP endpoint for MCP communication
- Built with TypeScript, MCP SDK, and Cloudflare Agents SDK
- Proper JSON-RPC 2.0 error handling
- Node.js compatibility mode enabled

## What is the Think Tool?

Based on [Anthropic's research](https://www.anthropic.com/engineering/claude-think-tool), the think tool creates a designated space for AI assistants to:
- Process external information carefully
- Follow detailed policies more consistently
- Make better decisions in multi-step scenarios
- Organize reasoning before taking actions

## Setup

### Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Node.js**: Version 18 or higher
3. **pnpm**: Install via `npm install -g pnpm`

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Deployment

Deploy to Cloudflare Workers:

```bash
pnpm run deploy
```

### Claude Code Configuration

Add the MCP server to Claude Code using the CLI via SSE transport:

```bash
# For production deployment (SSE)
claude mcp add think https://your-worker-name.workers.dev/sse -t sse

# For local development
claude mcp add think http://localhost:8787/sse -t sse
```

**Note**: This server supports both SSE (Server-Sent Events) and Streamable HTTP transport. While SSE works well, Streamable HTTP provides better reliability and is the newer standard.

You can verify the configuration with:
```bash
claude mcp list
```

## Usage

Once configured, Claude Code can use the think tool to organize its reasoning during complex tasks.

### Available Tool

**think**: Record a thought during reasoning
- `thought` (required): A thought to think about

Example usage:
```javascript
// During a complex debugging session
await think({ 
  thought: "The error occurs in the authentication flow. Let me check if the token is being properly validated before proceeding to fix the issue." 
})

// When analyzing multiple options
await think({ 
  thought: "I have three possible approaches: 1) Refactor the entire module, 2) Add a wrapper function, 3) Modify the existing implementation. Option 2 seems best because it maintains backward compatibility." 
})

// Before making important decisions
await think({ 
  thought: "The user wants to optimize performance. I should first profile the code to identify bottlenecks rather than making assumptions about what needs optimization." 
})
```

### When the Think Tool is Used

Claude Code will use the think tool when:
- Working through complex multi-step problems
- Analyzing tool outputs before making decisions
- Following detailed policies or guidelines
- Debugging challenging issues
- Evaluating multiple solution approaches

### Example Scenarios

The think tool improves performance in scenarios like:

1. **Software Engineering**: Breaking down complex refactoring tasks
2. **Debugging**: Systematically analyzing error patterns
3. **Architecture Design**: Evaluating trade-offs between different approaches
4. **Code Review**: Organizing observations before providing feedback
5. **Problem Solving**: Working through algorithmic challenges step-by-step

### CLAUDE.md Examples

To encourage effective use of the think tool, add these to your CLAUDE.md:

```markdown
# Think Tool Usage

Use the mcp__think__think tool to organize your reasoning during complex tasks.

- Use the think tool when:
  - Analyzing results from other tool calls
  - Making decisions between multiple approaches
  - Working through multi-step problems
  - Debugging complex issues
  - Following detailed implementation requirements

- Structure your thoughts to include:
  - Current understanding of the problem
  - Available options or approaches
  - Reasoning for decisions
  - Next steps to take

- Example thinking patterns:
  - "I see three potential issues here: X, Y, and Z. Let me investigate X first because..."
  - "The test failure suggests a race condition. I should check the async operations..."
  - "Before implementing, I need to consider the performance implications of..."
```

## Development

Run locally:
```bash
# Start local development server
pnpm dev
```

Run all checks before deployment:
```bash
pnpm build
```

This command runs:
1. `pnpm format` - Format code with Biome
2. `pnpm lint:fix` - Fix linting issues  
3. `pnpm cf-typegen` - Generate Cloudflare types
4. `pnpm type-check` - Check TypeScript types

Test the server:
```bash
# Test SSE connection
curl http://localhost:8787/sse

# Test health endpoint
curl http://localhost:8787/
```

## Performance Benefits

According to Anthropic's research, the think tool provides:
- Improved pass rates on complex tasks
- Better consistency in following policies
- More accurate multi-step reasoning
- Enhanced performance in customer service and software engineering domains

## Technical Details

- **Language**: TypeScript (ES2021 target)
- **Runtime**: Cloudflare Workers with Node.js compatibility
- **Protocol**: MCP (Model Context Protocol)
- **Transport**: SSE and Streamable HTTP
- **Observability**: Enabled for monitoring

## References

- [Give Claude "Thinking" Tool - Anthropic Engineering](https://www.anthropic.com/engineering/claude-think-tool)
- [Model Context Protocol (MCP) - Cloudflare Agents](https://developers.cloudflare.com/agents/model-context-protocol/)
- [Build a Remote MCP server - Cloudflare Agents](https://developers.cloudflare.com/agents/guides/remote-mcp-server/)

## License

MIT