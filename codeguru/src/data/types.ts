// types.ts

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