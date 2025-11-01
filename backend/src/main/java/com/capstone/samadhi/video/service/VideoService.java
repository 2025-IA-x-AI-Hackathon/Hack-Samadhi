package com.capstone.samadhi.video.service;

import com.capstone.samadhi.common.ResponseDto;
import com.capstone.samadhi.record.dto.RecordResponse;
import com.capstone.samadhi.record.entity.Record;
import com.capstone.samadhi.video.dto.VideoResponse;
import com.capstone.samadhi.video.entity.Video;
import com.capstone.samadhi.video.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VideoService {
    private final VideoRepository videoRepository;

    public ResponseDto<List<VideoResponse>> getAllVideo() {
        List<Video> videos = videoRepository.findAll();

        List<VideoResponse> videoResponseList = videos.stream()
                .map(VideoResponse::from)
                .collect(Collectors.toList());
        return new ResponseDto<>(true, videoResponseList);
    }
}
