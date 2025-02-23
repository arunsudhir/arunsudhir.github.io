// types.ts

/**
 * Represents different categories of coding problems
 * This can be expanded as new categories are added
 */
export type ProblemTag = 
  | 'sliding-window' 
  | 'graph' 
  | 'dynamic-programming'
  | 'binary-search'
  | 'two-pointers'
  | 'bfs'
  | 'dfs'
  | 'tree'
  | 'array'
  | 'string'
  | 'merge-intervals'
  | 'lc-hard'
  | 'lc-medium'
  | 'meta'
  | 'recursion'
  | 'linkedlist'
  | 'fundamentals' // New tag for fundamental concepts
  | 'stack'
  | 'lc-easy'; // New tag for LeetCode easy problems

// Interface for tag metadata
export interface TagMetadata {
    label: string;
    color: string;
  }
/**
 * Metadata for displaying tags, including user-friendly names and colors
 */
export const TAG_METADATA: Record<ProblemTag, TagMetadata> = {
    'sliding-window': { label: 'Sliding Window', color: 'bg-blue-100 text-blue-800' },
    'graph': { label: 'Graph', color: 'bg-purple-100 text-purple-800' },
    'dynamic-programming': { label: 'Dynamic Programming', color: 'bg-green-100 text-green-800' },
    'binary-search': { label: 'Binary Search', color: 'bg-yellow-100 text-yellow-800' },
    'two-pointers': { label: 'Two Pointers', color: 'bg-pink-100 text-pink-800' },
    'bfs': { label: 'BFS', color: 'bg-indigo-100 text-indigo-800' },
    'dfs': { label: 'DFS', color: 'bg-red-100 text-red-800' },
    'tree': { label: 'Tree', color: 'bg-emerald-100 text-emerald-800' },
    'array': { label: 'Array', color: 'bg-orange-100 text-orange-800' },
    'string': { label: 'String', color: 'bg-cyan-100 text-cyan-800' },
    'merge-intervals': { label: 'Merge Intervals', color: 'bg-teal-100 text-teal-800' },
    'lc-hard': { label: 'LeetCode Hard', color: 'bg-rose-100 text-rose-800' }, // Changed from red to rose
    'lc-medium': { label: 'LeetCode Medium', color: 'bg-amber-100 text-amber-800' }, // Changed from red to amber
    'meta': { label: 'Meta', color: 'bg-lime-100 text-lime-800' }, // Changed from blue to lime
    'recursion': { label: 'Recursion', color: 'bg-fuchsia-100 text-fuchsia-800' }, // Changed from purple to fuchsia
    'linkedlist': { label: 'Linked List', color: 'bg-violet-100 text-violet-800' },
    'fundamentals': { label: 'Fundamental', color: 'bg-slate-100 text-slate-800' },
    'stack': { label: 'Stack', color: 'bg-gray-200 text-gray-900' },
    'lc-easy': { label: 'LeetCode Easy', color: 'bg-zinc-100 text-zinc-800' }


  };

/**
 * Represents a coding problem that students can solve by filling in blanks
 * with provided code tokens. Each problem includes a title, description,
 * code template with blanks, and the correct solutions.
 */
export interface CodingProblem {
    /** Unique identifier for the problem, used for tracking completion state */
    id: string;
  
    /** Display title of the problem */
    title: string;
  
    /** Detailed description explaining what the student needs to do */
    description: string;
  
    /** 
     * Array of code lines where blanks are represented as _____N_____ 
     * where N is a number (e.g., _____1_____, _____2_____, etc.)
     */
    codeLines: string[];
  
    /** 
     * Available code snippets that can be dragged into the blanks
     * Each token should be a valid solution for at least one blank
     */
    tokens: string[];
  
    /** 
     * Maps blank numbers to their correct solutions
     * Keys are string numbers matching the _____N_____ patterns in codeLines
     * Values are the correct token that should fill that blank
     */
    solutions: {
      [key: string]: string;
    };
  
    /** 
     * Maps blank numbers to hint text that helps students understand
     * what should go in each blank
     */
    hints: {
      [key: string]: string;
    };

    /** 
     * Detailed explanation of the topic covered by this problem,
     * providing context and background knowledge before the student
     * attempts to solve it
     */
    topicExplanation?: string;

    tags: ProblemTag[]; // New field for problem categorization
  }
  
  /**
   * Represents the current state of a student's answers in the problem
   * Keys are the blank numbers and values are the tokens they've placed
   */
  export type ProblemAnswers = {
    [key: string]: string;
  };
  
  /**
   * Represents the difficulty level of a coding problem
   * Can be used to sort problems or show visual indicators
   */
  export enum ProblemDifficulty {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'advanced'
  }
  
  /**
   * Optional metadata that can be added to problems for better organization
   * and filtering capabilities
   */
  export interface ProblemMetadata {
    difficulty: ProblemDifficulty;
    topics: string[];
    timeEstimate: number; // in minutes
    prerequisites?: string[];
  }
  
  /**
   * Extends the base CodingProblem interface with optional metadata
   * Use this type when you want to include additional problem information
   */
  export interface EnhancedCodingProblem extends CodingProblem {
    metadata?: ProblemMetadata;
  }
  
  /**
   * Helper type for validating that a problem's tokens include all solutions
   * This helps catch errors where a solution refers to a token that doesn't exist
   */
  export type ValidProblem<T extends CodingProblem> = T & {
    solutions: {
      [K in keyof T['solutions']]: T['tokens'][number];
    };
  };