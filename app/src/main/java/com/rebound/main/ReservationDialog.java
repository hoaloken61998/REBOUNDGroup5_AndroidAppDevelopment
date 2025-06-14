package com.rebound.main;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;
import com.rebound.R;
public class ReservationDialog extends DialogFragment {
    public static ReservationDialog newInstance(String date, String time) {
        ReservationDialog dialog = new ReservationDialog();
        Bundle args = new Bundle();
        args.putString("selectedDate", date);
        args.putString("selectedTime", time);
        dialog.setArguments(args);
        return dialog;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.reservation_popup, container, false);

        // Xử lý khi bấm nút đóng (close icon)
        ImageView imgClose = view.findViewById(R.id.imgClose);
        imgClose.setOnClickListener(v -> dismiss()); // Đóng dialog, quay lại ScheduleServiceActivity

        Bundle args = getArguments();
        if (args != null) {
            String selectedDate = args.getString("selectedDate", "");
            String selectedTime = args.getString("selectedTime", "");

            TextView txtConfirmDate = view.findViewById(R.id.txtAppointmentDateValue);
            TextView txtConfirmTime = view.findViewById(R.id.txtAppointmentTimeValue);

            txtConfirmDate.setText("Ngày: " + selectedDate);
            txtConfirmTime.setText("Giờ: " + selectedTime);
        }
        return view;

    }

    @Override
    public void onStart() {
        super.onStart();
        if (getDialog() != null && getDialog().getWindow() != null) {
            Window window = getDialog().getWindow();
            window.setLayout(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            window.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }
    }
}
