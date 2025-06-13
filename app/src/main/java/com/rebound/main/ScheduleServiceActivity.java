package com.rebound.main;

import android.app.TimePickerDialog;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
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
import com.rebound.data.BranchData;
import com.rebound.connectors.BranchConnector;
import java.util.List;

import java.util.Calendar;

public class ScheduleServiceActivity extends Fragment {

    public ScheduleServiceActivity() {
        // Required empty public constructor
    }

    //Chỉnh màu nút
    private void setSelectedButton(MaterialButton button) {
        button.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor("#F2F0D4")));
        button.setTextColor(Color.WHITE);
        button.setStrokeWidth(0);
    }

    private void setUnselectedButton(MaterialButton button) {
        button.setBackgroundTintList(ColorStateList.valueOf(Color.WHITE));
        button.setTextColor(Color.parseColor("#22000000"));
        button.setStrokeColor(ColorStateList.valueOf(Color.parseColor("#22000000")));
        button.setStrokeWidth(1);
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

        //Nhan vao brachHCM va Brach Hanoi
        MaterialButton btnHanoi = view.findViewById(R.id.btnScheduleHanoi);
        MaterialButton btnHCM = view.findViewById(R.id.btnScheduleHCM);


        // Các TextView hiển thị chi nhánh
        TextView txtBranch1 = view.findViewById(R.id.txtScheduleBranch1);
        TextView txtAddress1 = view.findViewById(R.id.txtScheduleAddress1);
        TextView txtTime1 = view.findViewById(R.id.txtScheduleTime1);
        ImageView imgBranch1 = view.findViewById(R.id.imgBranch1);

        TextView txtBranch2 = view.findViewById(R.id.txtScheduleBranch2);
        TextView txtAddress2 = view.findViewById(R.id.txtScheduleAddress2);
        TextView txtTime2 = view.findViewById(R.id.txtScheduleTime2);
        ImageView imgBranch2 = view.findViewById(R.id.imgBranch2);

        // Khi bấm nút HANOI
        btnHanoi.setOnClickListener(v -> {
            List<BranchConnector> branches = BranchData.getHanoiBranches();
            if (branches.size() >= 2) {
                txtBranch1.setText(branches.get(0).getName());
                txtAddress1.setText(branches.get(0).getAddress());
                txtTime1.setText(branches.get(0).getHours());
                imgBranch1.setImageResource(branches.get(0).getImageResId());

                txtBranch2.setText(branches.get(1).getName());
                txtAddress2.setText(branches.get(1).getAddress());
                txtTime2.setText(branches.get(1).getHours());
                imgBranch2.setImageResource(branches.get(1).getImageResId());
            }
            // Highlight nút HANOI
            setSelectedButton(btnHanoi);
            setUnselectedButton(btnHCM);
        });

        // Khi bấm nút HCM
        btnHCM.setOnClickListener(v -> {
            List<BranchConnector> branches = BranchData.getHCMBranches();
            if (branches.size() >= 2) {
                txtBranch1.setText(branches.get(0).getName());
                txtAddress1.setText(branches.get(0).getAddress());
                txtTime1.setText(branches.get(0).getHours());
                imgBranch1.setImageResource(branches.get(0).getImageResId());

                txtBranch2.setText(branches.get(1).getName());
                txtAddress2.setText(branches.get(1).getAddress());
                txtTime2.setText(branches.get(1).getHours());
                imgBranch2.setImageResource(branches.get(1).getImageResId());
            }
            setSelectedButton(btnHCM);
            setUnselectedButton(btnHanoi);
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
