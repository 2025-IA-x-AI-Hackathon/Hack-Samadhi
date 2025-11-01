package com.capstone.samadhi.video.dto;

import com.capstone.samadhi.video.entity.Video;

public record VideoResponse(
        Long id,
        String thumbPath, // Entity의 thumb_path를 camelCase로 변경
        String title,
        String path,
        long duration
) {

    public static VideoResponse from(Video video) {
        return new VideoResponse(
                video.getId(),
                video.getThumb_path(), // 엔티티의 필드명(thumb_path)에서 값을 가져옵니다.
                video.getTitle(),
                video.getPath(),
                video.getDuration()
        );
    }
}
