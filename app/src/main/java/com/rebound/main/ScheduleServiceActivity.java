package com.rebound.main;

import android.app.TimePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.TimePicker;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.google.android.material.button.MaterialButton;
import com.rebound.R;

import java.util.Calendar;

public class ScheduleServiceActivity extends Fragment {

    public ScheduleServiceActivity() {
        // Required empty public constructor
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {

        // NÊN: đổi tên XML thành fragment_schedule_service.xml (nhưng vẫn xài cũ được nếu bạn chưa đổi)
        View view = inflater.inflate(R.layout.activity_schedule_service, container, false);

        TextView txtScheduleSelectedTime = view.findViewById(R.id.txtScheduleSelectedTime);
        MaterialButton btnScheduleBook = view.findViewById(R.id.btnScheduleBook);
        ImageView imgBell = view.findViewById(R.id.imgBell);

        txtScheduleSelectedTime.setOnClickListener(v -> {
            Calendar calendar = Calendar.getInstance();
            int hour = calendar.get(Calendar.HOUR_OF_DAY);
            int minute = calendar.get(Calendar.MINUTE);

            TimePickerDialog timePickerDialog = new TimePickerDialog(
                    requireContext(),
                    (TimePicker timePicker, int selectedHour, int selectedMinute) -> {
                        String time = String.format("%02d:%02d", selectedHour, selectedMinute);
                        txtScheduleSelectedTime.setText(time);
                    },
                    hour, minute, true
            );
            timePickerDialog.show();
        });

        btnScheduleBook.setOnClickListener(v -> {
            ReservationDialog dialog = new ReservationDialog();
            dialog.show(requireActivity().getSupportFragmentManager(), "ReservationDialog");
        });


        //Gán sự kiện khi nhấn vào thông báo
        imgBell.setOnClickListener(v -> {
            //Nếu mở màn hình có thông báo thì là True, còn không thì fasle
            boolean hasNotification = true;

            Intent intent = hasNotification ?
                    new Intent(requireContext(), NotificationActivity.class)
                    : new Intent(requireContext(), NoNotificationActivity.class);

            startActivity(intent);
        });

        return view;
    }
}
