import { poseVectorizedData } from "@/types/poseVectorizedData";
import { CalculateSimilarity, LANDMARK_INDICES } from "../mediapipe/angle-calculator";

export function classifyPoseWithVectorized(vectorized: number[]) {
    let bestPose = "unknown";
    let maxDistance = 0;
    const distPerPose: Record<string, number> = {};
    const THRESHOLD = 90;

    // 좌우 반전 버전 생성
    const mirroredVectorized = normalizeMirroredVectorized(vectorized);

    for (const [name, poseVectorized] of Object.entries(poseVectorizedData)) {
      const calcDistance = (a: number[]) => {
        const similarity = CalculateSimilarity(poseVectorized, a, 1);
        
        // 1에 가까울수록 다름, 0에 가까울수록 유사
        return similarity;
      };

      // 원본과 반전 둘 다 계산
      const distanceOriginal = calcDistance(vectorized);
      const distanceMirrored = calcDistance(mirroredVectorized);

      // 더 유사한 쪽 선택
      const maxForThisPose = Math.max(distanceOriginal, distanceMirrored);

      if (maxForThisPose > THRESHOLD && maxForThisPose > maxDistance) {
        maxDistance = maxForThisPose;
        bestPose = name;
      }
      
      distPerPose[name] = maxForThisPose;
    }
    
    // console.log("distPerPose:", distPerPose);
    // console.log("Best Pose:", bestPose)

    return {bestPose, maxDistance};
  };
  
// 좌우 반전된 각도 데이터 생성 함수
export const normalizeMirroredVectorized = (vectorized: number[]): number[] => {
    const swapped: Partial<number[]> = { ...vectorized };

    // 좌우 대칭 쌍 정의
    const mirrorPairs = [
        [LANDMARK_INDICES.LEFT_EAR, LANDMARK_INDICES.RIGHT_EAR],
        [LANDMARK_INDICES.LEFT_SHOULDER, LANDMARK_INDICES.RIGHT_SHOULDER],
        [LANDMARK_INDICES.LEFT_ELBOW, LANDMARK_INDICES.RIGHT_ELBOW],
        [LANDMARK_INDICES.LEFT_WRIST, LANDMARK_INDICES.RIGHT_WRIST],
        [LANDMARK_INDICES.LEFT_INDEX, LANDMARK_INDICES.RIGHT_INDEX],
        [LANDMARK_INDICES.LEFT_HIP, LANDMARK_INDICES.RIGHT_HIP],
        [LANDMARK_INDICES.LEFT_KNEE, LANDMARK_INDICES.RIGHT_KNEE],
        [LANDMARK_INDICES.LEFT_ANKLE, LANDMARK_INDICES.RIGHT_ANKLE],
        [LANDMARK_INDICES.LEFT_HEEL, LANDMARK_INDICES.RIGHT_HEEL],
    ];
    
    // 각 쌍의 값을 교환
    mirrorPairs.forEach(([left, right]) => {
      const temp = swapped[left];
      swapped[left] = swapped[right];
      swapped[right] = temp;
    });

    // spine, neckAngle은 중앙 기준이므로 그대로 유지
    return swapped as number[];
};