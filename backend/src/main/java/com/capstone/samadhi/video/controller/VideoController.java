package com.capstone.samadhi.video.controller;

import com.capstone.samadhi.common.ResponseDto;
import com.capstone.samadhi.common.SecurityUtil;
import com.capstone.samadhi.record.dto.RecordResponse;
import com.capstone.samadhi.video.dto.VideoResponse;
import com.capstone.samadhi.video.service.VideoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/video")
public class VideoController {
    private final VideoService videoService;
    @GetMapping("")
    @Operation(summary = "전체 비디오 목록 조회", description = "전체 샘플 비디오를 조회합니다.")
    @ApiResponses(value = {

            @ApiResponse(responseCode = "200", description = "조회 성공")
    })
    public ResponseEntity<ResponseDto<List<VideoResponse>>> getAllVideos() {
        return ResponseEntity.ok(videoService.getAllVideo());
    }
}
