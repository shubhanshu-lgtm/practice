// /**
//  * Enhanced Auditor Evaluation Service with Technical Cluster Mapping
//  * Analyzes auditor qualifications against standards with technical cluster requirements
//  */

// import {
//   TECHNICAL_CLUSTER_MAPPING,
//   STANDARD_ID_MAPPING,
//   checkTechnicalClusterRequirements,
// } from '../../constants/technicalClusterMapping';

// export interface AuditExperience {
//   auditExpStandatd: string;
//   manDays: number;
//   auditType: string;
//   techArea?: string | number;
// }

// export interface Training {
//   trainingStandard: string;
// }

// export interface WorkExperience {
//   duration: string;
//   position: string;
//   workexpIafCode?: string;
// }

// export interface Education {
//   duration: string;
// }

// export interface EvaluationResult {
//   standard: string;
//   status: 'Qualified' | 'Not Qualified' | 'Partially Qualified';
//   reference: string;
//   hasTraining: boolean;
//   auditDays: number;
//   qualifiedClusters: {
//     [clusterName: string]: {
//       iafCodes: number[];
//       status: 'Qualified' | 'Not Qualified';
//       missingRequirements: string[];
//     };
//   };
//   unqualifiedClusters: {
//     [clusterName: string]: {
//       iafCodes: number[];
//       missingRequirements: string[];
//     };
//   };
//   missingRequirements: string[];
// }

// export class EnhancedAuditorEvaluator {
//   /**
//    * Evaluate auditor against all standards with technical cluster mapping
//    */
//   static evaluateAuditorByStandard(
//     standardId: string,
//     trainings: Training[],
//     auditExperiences: AuditExperience[],
//     workExperiences: WorkExperience[],
//     education: Education[],
//   ): EvaluationResult {
//     const standardKey = STANDARD_ID_MAPPING[standardId];
//     const standardMapping = TECHNICAL_CLUSTER_MAPPING[standardKey];

//     if (!standardMapping) {
//       throw new Error(`Unknown standard ID: ${standardId}`);
//     }

//     // Check if auditor has training for this standard
//     const hasTraining = trainings.some(
//       (t) => t.trainingStandard === standardId,
//     );

//     // Get audit experiences for this standard
//     const standardAuditExperiences = auditExperiences.filter(
//       (exp) => exp.auditExpStandatd === standardId,
//     );

//     // Calculate total audit days
//     const totalAuditDays = standardAuditExperiences.reduce(
//       (sum, exp) => sum + exp.manDays,
//       0,
//     );

//     // Evaluate each technical cluster
//     const qualifiedClusters: Record<string, any> = {};
//     const unqualifiedClusters: Record<string, any> = {};
//     const missingRequirements: string[] = [];

//     const clusterNames = Object.keys(standardMapping.technicalClusters);

//     for (const clusterName of clusterNames) {
//       const cluster = standardMapping.technicalClusters[clusterName];
//       const iafCodes = cluster.iafCodes || [];

//       // Get work experience years in relevant IAF codes
//       const workExpInCluster = this.getWorkExperienceYearsInCluster(
//         workExperiences,
//         iafCodes,
//       );

//       // Get education years
//       const eduYears = this.getEducationYears(education);

//       // Get audit days in this cluster
//       const auditDaysInCluster = standardAuditExperiences
//         .filter((exp) => {
//           if (!exp.techArea) return false;
//           const techAreas = String(exp.techArea).split(',').map((t) => Number.parseInt(t.trim(), 10));
//           return techAreas.some((code) => iafCodes.includes(code));
//         })
//         .reduce((sum, exp) => sum + exp.manDays, 0);

//       const clusterResult = checkTechnicalClusterRequirements(
//         standardId,
//         clusterName,
//         workExpInCluster,
//         eduYears,
//         auditDaysInCluster,
//       );

//       if (clusterResult.meets && hasTraining) {
//         qualifiedClusters[clusterName] = {
//           iafCodes,
//           status: 'Qualified',
//           missingRequirements: [],
//         };
//       } else {
//         unqualifiedClusters[clusterName] = {
//           iafCodes,
//           missingRequirements: clusterResult.missing,
//         };
//         missingRequirements.push(
//           ...clusterResult.missing.map((req) => `${clusterName}: ${req}`),
//         );
//       }
//     }

//     // Determine overall status
//     const qualifiedCount = Object.keys(qualifiedClusters).length;
//     const totalCount = clusterNames.length;
//     let status: 'Qualified' | 'Not Qualified' | 'Partially Qualified' =
//       'Not Qualified';

//     if (hasTraining) {
//       if (qualifiedCount === totalCount) {
//         status = 'Qualified';
//       } else if (qualifiedCount > 0) {
//         status = 'Partially Qualified';
//       }
//     }

//     return {
//       standard: standardMapping.standardCode,
//       status,
//       reference: standardMapping.referenceName,
//       hasTraining,
//       auditDays: totalAuditDays,
//       qualifiedClusters,
//       unqualifiedClusters,
//       missingRequirements,
//     };
//   }

//   /**
//    * Get work experience years in relevant IAF codes
//    */
//   private static getWorkExperienceYearsInCluster(
//     workExperiences: WorkExperience[],
//     iafCodes: number[],
//   ): number {
//     if (iafCodes.length === 0) {
//       // For standards without specific IAF codes, return total work experience
//       return workExperiences.reduce((sum, exp) => {
//         const years = this.parseDuration(exp.duration);
//         return sum + years;
//       }, 0);
//     }

//     return workExperiences
//       .filter((exp) => {
//         if (!exp.workexpIafCode) return false;
//         const expCodes = String(exp.workexpIafCode)
//           .split(',')
//           .map((c) => Number.parseInt(c.trim(), 10));
//         return expCodes.some((code) => iafCodes.includes(code));
//       })
//       .reduce((sum, exp) => sum + this.parseDuration(exp.duration), 0);
//   }

//   /**
//    * Get total education years
//    */
//   private static getEducationYears(education: Education[]): number {
//     return education.reduce((sum, edu) => {
//       const years = this.parseDuration(edu.duration);
//       return sum + years;
//     }, 0);
//   }

//   /**
//    * Parse duration string to years
//    * Handles formats like "2 years", "787 days", "771.0 days", etc.
//    */
//   private static parseDuration(durationStr: string | number): number {
//     if (!durationStr) return 0;

//     const str = String(durationStr).toLowerCase().trim();

//     // If it's already a number, assume it's days
//     if (!Number.isNaN(Number(str))) {
//       const days = Number.parseFloat(str);
//       return Math.floor(days / 365); // Convert days to years
//     }

//     // Check for "X years" format
//     const yearsRegex = /(\d+(?:\.\d+)?)\s*years?/;
//     const yearsMatch = yearsRegex.exec(str);
//     if (yearsMatch) {
//       return Math.floor(Number.parseFloat(yearsMatch[1]));
//     }

//     // Check for "X days" format
//     const daysRegex = /(\d+(?:\.\d+)?)\s*days?/;
//     const daysMatch = daysRegex.exec(str);
//     if (daysMatch) {
//       const days = Number.parseFloat(daysMatch[1]);
//       return Math.floor(days / 365);
//     }

//     // Check for "X months" format
//     const monthsRegex = /(\d+(?:\.\d+)?)\s*months?/;
//     const monthsMatch = monthsRegex.exec(str);
//     if (monthsMatch) {
//       const months = Number.parseFloat(monthsMatch[1]);
//       return Math.floor(months / 12);
//     }

//     return 0;
//   }

//   /**
//    * Generate evaluation summary for all standards
//    */
//   static generateComprehensiveEvaluation(
//     trainings: Training[],
//     auditExperiences: AuditExperience[],
//     workExperiences: WorkExperience[],
//     education: Education[],
//   ): {
//     evaluationByStandard: Record<string, EvaluationResult>;
//     summary: {
//       totalStandards: number;
//       qualifiedStandards: number;
//       partiallyQualifiedStandards: number;
//       notQualifiedStandards: number;
//       overallStatus: string;
//       qualifiedStandardsList: string[];
//       pendingStandardsList: string[];
//       recommendations: string[];
//     };
//   } {
//     const evaluationByStandard: Record<string, EvaluationResult> = {};
//     const standardIds = Object.keys(STANDARD_ID_MAPPING);

//     for (const standardId of standardIds) {
//       try {
//         evaluationByStandard[standardId] = this.evaluateAuditorByStandard(
//           standardId,
//           trainings,
//           auditExperiences,
//           workExperiences,
//           education,
//         );
//       } catch (error: unknown) {
//         console.error(`Error evaluating standard ${standardId}:`, error);
//         // Skip if standard evaluation fails
//       }
//     }

//     // Generate summary
//     const qualifiedStandards = Object.values(evaluationByStandard).filter(
//       (e) => e.status === 'Qualified',
//     );
//     const partiallyQualifiedStandards = Object.values(
//       evaluationByStandard,
//     ).filter((e) => e.status === 'Partially Qualified');
//     const notQualifiedStandards = Object.values(evaluationByStandard).filter(
//       (e) => e.status === 'Not Qualified',
//     );

//     const recommendations: string[] = [];
//     for (const evaluation of Object.values(evaluationByStandard)) {
//       if (evaluation.status !== 'Qualified') {
//         recommendations.push(
//           `${evaluation.reference}: ${evaluation.missingRequirements.join('; ')}`,
//         );
//       }
//     }

//     return {
//       evaluationByStandard,
//       summary: {
//         totalStandards: standardIds.length,
//         qualifiedStandards: qualifiedStandards.length,
//         partiallyQualifiedStandards: partiallyQualifiedStandards.length,
//         notQualifiedStandards: notQualifiedStandards.length,
//         overallStatus: this.calculateOverallStatus(
//           notQualifiedStandards.length,
//           partiallyQualifiedStandards.length,
//         ),
//         qualifiedStandardsList: qualifiedStandards.map((e) => e.reference),
//         pendingStandardsList: Object.values(evaluationByStandard)
//           .filter((e) => e.status !== 'Qualified')
//           .map((e) => e.reference),
//         recommendations,
//       },
//     };
//   }

//   /**
//    * Calculate overall status based on qualification counts
//    */
//   private static calculateOverallStatus(
//     notQualifiedCount: number,
//     partiallyQualifiedCount: number,
//   ): string {
//     if (notQualifiedCount === 0 && partiallyQualifiedCount === 0) {
//       return 'Fully Qualified';
//     } else if (notQualifiedCount === 0 && partiallyQualifiedCount > 0) {
//       return 'Partially Qualified';
//     } else {
//       return 'Not Qualified';
//     }
//   }
// }
