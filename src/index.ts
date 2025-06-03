/// <reference path="../worker-configuration.d.ts" />

/**
 * Think MCP Server
 *
 * An MCP server that provides a thinking tool for AI assistants to organize
 * their reasoning during complex tasks. Based on Anthropic's research on
 * improving AI performance through explicit reasoning steps.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from "zod";

// Define our MCP agent with the think tool
export class ThinkMCP extends McpAgent {
	server = new McpServer({
		name: "Think MCP",
		version: "1.0.0",
	});

	async init() {
		// Register the think tool
		this.server.tool(
			"think",
			"Use the tool to think about something. It will not obtain new information or change the database, but just append the thought to the log. Use it when complex reasoning or some cache memory is needed.",
			{
				thought: z.string().describe("A thought to think about"),
			},
			async ({ thought }) => {
				// Log the thought for debugging purposes
				console.log(`[Think] ${thought}`);

				return {
					content: [
						{
							type: "text",
							text: `Thought: ${thought}`,
						},
					],
				};
			},
		);
	}
}

// Export the worker
export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		// Handle SSE endpoint
		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			return ThinkMCP.serveSSE("/sse").fetch(request, env, ctx);
		}

		// Handle HTTP endpoint
		if (url.pathname === "/mcp") {
			return ThinkMCP.serve("/mcp").fetch(request, env, ctx);
		}

		// Health check endpoint
		if (url.pathname === "/") {
			return new Response("Think MCP Server is running!", {
				headers: { "Content-Type": "text/plain" },
			});
		}

		return new Response("Not found", { status: 404 });
	},
};
